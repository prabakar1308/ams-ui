import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, distinctUntilChanged, generate, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import {
  DEFAULT_TANK_TYPE,
  HARVEST_TYPES,
  WORKSHEET_OUTPUT_UNITS,
  WORKSHEET_STATUS,
  WORKSHEET_TABLE_STATUS,
} from '@app/shared/constants/shared.contants';
import { CreateWorksheetRequest, UpdateWorksheet } from '@app/worksheet/models/create-worksheet';
import { MasterData, WorksheetFilter } from '@app/shared/models/shared-state';
import { FORM_CONTROL_NAMES, formConfig, formDetails } from './worksheet.config';
import { ActiveRestock } from '@app/worksheet/models/restock';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { MasterRange } from '@app/shared/models/master';
import { WorksheetService } from '@app/worksheet/services/worksheet.service';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from '@app/core/services/notification.service';
import { SEVERITY } from '@app/core/core.contants';

@Component({
  selector: 'app-worksheet-create',
  standalone: false,
  templateUrl: './worksheet-create.component.html',
  styleUrl: './worksheet-create.component.scss',
})
export class WorksheetCreateComponent implements OnInit, OnDestroy {
  private unSubscribe = new Subject<void>();
  formConfigData = formConfig;
  formDetails = formDetails;
  worksheetFilter: WorksheetFilter = {};
  selectedTankType: number = DEFAULT_TANK_TYPE;
  activeRestocks: ActiveRestock[] = [];
  editId = 0;
  currentWorksheetStatus = WORKSHEET_STATUS.READY_FOR_STOCKING;
  canDelete = true;

  constructor(
    private router: Router,
    private worksheetFacadeService: WorksheetFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private worksheetService: WorksheetService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        const id = Number(params['id']);
        this.editId = id;
        this.worksheetFacadeService.getCurrentWorksheet(id);
        this.formDetails = {
          ...this.formDetails,
          title: 'Update Worksheet',
          description: 'Modify tank parameters',
        };
      }
    });

    this.worksheetFacadeService.getActiveRestocks('A,U');
    // Combine activeWorksheets$ and tankSelection$
    combineLatest([
      this.worksheetFacadeService.currentWorksheet$,
      this.worksheetFacadeService.activeWorksheets$,
      this.worksheetFacadeService.tankSelection$,
      this.worksheetFacadeService.activeRestocks$,
      this.sharedFacadeService.masterData$,
      this.sharedFacadeService.userData$,
    ])
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(
        ([
          currentWorksheet,
          activeWorksheets,
          tankSelection,
          activeRestocks,
          masterData,
          userData,
        ]) => {
          this.activeRestocks = activeRestocks;
          this.canDelete = currentWorksheet?.statusId === WORKSHEET_STATUS.READY_FOR_STOCKING;
          this.currentWorksheetStatus =
            currentWorksheet?.statusId || WORKSHEET_STATUS.READY_FOR_STOCKING;
          const { tanks, tankType } = tankSelection;

          if (!tankType) {
            this.selectedTankType = tankType || DEFAULT_TANK_TYPE;
            this.worksheetFacadeService.getActiveWorksheets({
              tankTypeId: DEFAULT_TANK_TYPE,
              userId: 0,
              statusId: 0,
            });
          }

          const restocks =
            this.editId &&
            currentWorksheet &&
            currentWorksheet.restocks &&
            currentWorksheet.restocks.length > 0
              ? currentWorksheet.restocks
              : [];

          // Update formConfigData based on tankSelection and activeWorksheets
          this.formConfigData = this.formConfigData.map((data) => {
            switch (data.name) {
              case FORM_CONTROL_NAMES.TANK_TYPE:
                return {
                  ...data,
                  value:
                    this.editId && currentWorksheet
                      ? currentWorksheet.tankTypeId
                      : tankType || DEFAULT_TANK_TYPE,
                  disabled: !!this.editId,
                  options: masterData?.tankTypes.map((type) => ({
                    label: type.value,
                    value: type.id,
                    dependents: [{ name: FORM_CONTROL_NAMES.TANKS, value: [], askReset: true }],
                  })),
                };

              case FORM_CONTROL_NAMES.TANKS:
                return {
                  ...data,
                  value: this.editId && currentWorksheet ? [currentWorksheet?.tankNumber] : tanks,
                  disabled: !!this.editId,
                  options: activeWorksheets
                    .filter((ws) => (this.editId ? ws : !ws.worksheetId))
                    .map((ws) => ({
                      label: `Tank ${ws.tankNumber}`,
                      value: ws.tankNumber,
                    })),
                };

              case FORM_CONTROL_NAMES.PH:
              case FORM_CONTROL_NAMES.SALNITY:
              case FORM_CONTROL_NAMES.TEMPERATURE: {
                const key = data.name.toLowerCase() as keyof MasterData;
                const dataKey = data.name.toLowerCase() as keyof UpdateWorksheet;
                const masterValues = masterData[key] as MasterRange;
                return {
                  ...data,
                  value:
                    this.editId && currentWorksheet
                      ? currentWorksheet[dataKey]
                      : masterValues.defaultValue,
                  meta: {
                    ...data.meta,
                    min: masterValues.min,
                    max: masterValues.max,
                    step: masterValues.step,
                    unitLabel: masterValues.unitName,
                  },
                };
              }

              case FORM_CONTROL_NAMES.HARVEST_TYPE:
                return {
                  ...data,
                  value:
                    this.editId && currentWorksheet ? currentWorksheet.harvestTypeId : data.value,
                  options: masterData?.harvestTypes
                    // to remove manual from the list
                    .filter((type) => type.id !== HARVEST_TYPES.MANUAL)
                    .map((type) => {
                      if (type.value.toLowerCase().includes('restock')) {
                        return {
                          label: type.value,
                          value: type.id,
                          dependents: [
                            {
                              name: FORM_CONTROL_NAMES.HARVEST_HOURS,
                              value: type.harvestTime,
                            },
                          ],
                          hide: [FORM_CONTROL_NAMES.INPUT_COUNT, FORM_CONTROL_NAMES.INPUT_UNIT_ID],
                          show: [FORM_CONTROL_NAMES.RESTOCK],
                        };
                      }
                      return {
                        label: type.value,
                        value: type.id,
                        dependents: [
                          { name: FORM_CONTROL_NAMES.HARVEST_HOURS, value: type.harvestTime },
                        ],
                        show: [FORM_CONTROL_NAMES.INPUT_COUNT, FORM_CONTROL_NAMES.INPUT_UNIT_ID],
                        hide: [FORM_CONTROL_NAMES.RESTOCK],
                      };
                    }),
                };

              case FORM_CONTROL_NAMES.HARVEST_HOURS:
                return {
                  ...data,
                  value:
                    this.editId && currentWorksheet ? currentWorksheet.harvestHours : data.value,
                };
              case FORM_CONTROL_NAMES.RESTOCK:
                return {
                  ...data,
                  // hide: restocks.length ? false : true,
                  disabled: restocks.length ? false : true,
                  value: restocks,
                  options: activeRestocks
                    .filter((restock) => {
                      if (restocks.length)
                        return (
                          restock.status === WORKSHEET_TABLE_STATUS.ACTIVE || restock.worksheetId
                        );
                      return restock.status === WORKSHEET_TABLE_STATUS.ACTIVE;
                    })
                    .map((restock) => {
                      const {
                        count,
                        unit,
                        worksheet: { tankNumber, tankType },
                      } = restock;
                      return {
                        label: `${tankType} Tank #${tankNumber} - ${count} ${unit}`,
                        value: restock.id,
                      };
                    }),
                };

              case FORM_CONTROL_NAMES.INPUT_COUNT:
                return {
                  ...data,
                  // hide: restocks.length ? true : false,
                  disabled: restocks.length ? true : false,
                  value: this.editId && currentWorksheet ? currentWorksheet.inputCount : data.value,
                };

              case FORM_CONTROL_NAMES.INPUT_UNIT_ID:
                return {
                  ...data,
                  // hide: restocks.length ? true : false,
                  disabled: restocks.length ? true : false,
                  value:
                    this.editId && currentWorksheet ? currentWorksheet.inputUnitId : data.value,
                  options: masterData?.worksheetUnits
                    .filter((unit) => !WORKSHEET_OUTPUT_UNITS.includes(unit.id)) // Filter out units in WORKSHEET_OUTPUT_UNITS
                    .map((unit) => {
                      const { value, brand, specs } = unit;
                      let unitLabel = value;
                      if (brand) unitLabel = `${unitLabel} - ${brand}`;
                      if (specs) unitLabel = `${unitLabel} (${specs})`;
                      return {
                        ...unit,
                        label: unitLabel,
                        value: unit.id,
                      };
                    }),
                };

              case FORM_CONTROL_NAMES.USER_ID:
                return {
                  ...data,
                  value: this.editId && currentWorksheet ? currentWorksheet.userId : data.value,
                  options: userData.map((user) => ({
                    ...user,
                    label: `${user.firstName} ${user.lastName}`,
                    value: user.id,
                  })),
                };

              case FORM_CONTROL_NAMES.GENERATED_AT:
                return {
                  ...data,
                  value:
                    this.editId && currentWorksheet ? currentWorksheet.generatedAt : data.value,
                };
              default:
                return data;
            }
          });
        },
      );
  }

  formValueChange(event: unknown) {
    const { name, value } = event as { name: string; value: number };
    if (name === FORM_CONTROL_NAMES.TANK_TYPE) {
      this.worksheetFacadeService.updateWorksheetTankSelection({ tankType: value, tanks: [] });
      this.worksheetFacadeService.getActiveWorksheets({
        tankTypeId: value,
        userId: 0,
        statusId: 0,
      });
    }
  }

  get validationRules() {
    return {
      [FORM_CONTROL_NAMES.HARVEST_TYPE]: {
        validate: (value: number, dependentValue: number[]) =>
          value === HARVEST_TYPES.RESTOCKING && dependentValue.length > 1,
        message: 'Restocking can be created with only one tank',
        dependentKey: FORM_CONTROL_NAMES.TANKS,
      },
    };
  }

  goToHomePage() {
    this.router.navigate(['/worksheet']);
  }

  deleteWorksheet() {
    const data = {
      title: 'Delete Confirmation',
      message: `Are you sure you want to delete the worksheet?`,
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });
    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.worksheetService.deleteWorksheet(this.editId).subscribe((res) => {
          if (res.status === 200) {
            this.notificationService.showMessage(
              SEVERITY.SUCCESS,
              'Worksheet is deleted successfully!',
            );
            this.router.navigate(['worksheet']);
          }
        });
      }
    });
  }

  submitFormData(formData: unknown) {
    let requestData = null;

    if (this.editId) requestData = formData as UpdateWorksheet;
    else requestData = formData as CreateWorksheetRequest;

    if (!requestData) return;

    if (requestData.restocks && requestData.restocks.length) {
      let inputCount = 0;
      let inputUnitId = 0;
      requestData.restocks.forEach((restockId) => {
        const filteredRestock = this.activeRestocks.filter((ar) => ar.id === restockId);
        if (filteredRestock && filteredRestock.length) {
          inputCount += filteredRestock[0].count;
          inputUnitId = filteredRestock[0].unitId || 0;
        }
      });
      requestData = {
        ...requestData,
        inputCount,
        inputUnitId,
      };
    }
    requestData = {
      ...requestData,
      harvestHours: requestData.harvestHours ? +requestData.harvestHours : 0,
      statusId: this.currentWorksheetStatus,
      id: this.editId || undefined,
      generatedAt: requestData.generatedAt || new Date(),
    };

    if (this.editId) this.worksheetFacadeService.updateWorksheetParams(requestData);
    else this.worksheetFacadeService.createWorksheets(requestData as CreateWorksheetRequest);
  }

  ngOnDestroy(): void {
    this.worksheetFacadeService.resetCurrentWorksheet();
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
