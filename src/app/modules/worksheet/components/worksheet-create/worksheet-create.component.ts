import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { DEFAULT_TANK_TYPE, WORKSHEET_STATUS } from '@app/shared/constants/shared.contants';
import { CreateWorksheetRequest } from '@app/worksheet/models/create-worksheet';
import { MasterData, WorksheetFilter } from '@app/shared/models/shared-state';
import { FORM_CONTROL_NAMES, formConfig, formDetails } from './worksheet.config';
import { ActiveRestock } from '@app/worksheet/models/restock';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { MasterRange } from '@app/shared/models/master';

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

  constructor(
    private router: Router,
    private worksheetFacadeService: WorksheetFacadeService,
    private sharedFacadeService: SharedFacadeService,
  ) {}

  ngOnInit() {
    this.worksheetFacadeService.getActiveRestocks('A');
    // Combine activeWorksheets$ and tankSelection$
    combineLatest([
      this.worksheetFacadeService.activeWorksheets$,
      this.worksheetFacadeService.tankSelection$,
      this.worksheetFacadeService.activeRestocks$,
      this.sharedFacadeService.masterData$,
      this.sharedFacadeService.userData$,
    ])
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(([activeWorksheets, tankSelection, activeRestocks, masterData, userData]) => {
        this.activeRestocks = activeRestocks;
        const { tanks, tankType } = tankSelection;

        if (!tankType) {
          this.selectedTankType = tankType || DEFAULT_TANK_TYPE;
          this.worksheetFacadeService.getActiveWorksheets({
            tankTypeId: DEFAULT_TANK_TYPE,
            userId: 0,
            statusId: 0,
          });
        }

        // Update formConfigData based on tankSelection and activeWorksheets
        this.formConfigData = this.formConfigData.map((data) => {
          switch (data.name) {
            case FORM_CONTROL_NAMES.TANK_TYPE:
              return {
                ...data,
                value: tankType || DEFAULT_TANK_TYPE,
                options: masterData?.tankTypes.map((type) => ({
                  label: type.value,
                  value: type.id,
                  dependents: [{ name: FORM_CONTROL_NAMES.TANKS, value: [], askReset: true }],
                })),
              };

            case FORM_CONTROL_NAMES.TANKS:
              return {
                ...data,
                value: tanks,
                options: activeWorksheets
                  .filter((ws) => !ws.worksheetId)
                  .map((ws) => ({
                    label: `Tank ${ws.tankNumber}`,
                    value: ws.tankNumber,
                  })),
              };

            case FORM_CONTROL_NAMES.PH:
            case FORM_CONTROL_NAMES.SALNITY:
            case FORM_CONTROL_NAMES.TEMPERATURE: {
              const key = data.name.toLowerCase() as keyof MasterData;
              const masterValues = masterData[key] as MasterRange;
              return {
                ...data,
                value: masterValues.defaultValue,
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
                options: masterData?.harvestTypes.map((type) => {
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

            case FORM_CONTROL_NAMES.RESTOCK:
              return {
                ...data,
                options: activeRestocks.map((restock) => {
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

            case FORM_CONTROL_NAMES.INPUT_UNIT_ID:
              return {
                ...data,
                options: masterData?.units.map((unit) => ({
                  label: unit.value,
                  value: unit.id,
                })),
              };

            case FORM_CONTROL_NAMES.USER_ID:
              return {
                ...data,
                options: userData.map((user) => ({
                  ...user,
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                })),
              };

            default:
              return data;
          }
        });
      });
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

  goToHomePage() {
    this.router.navigate(['/worksheet']);
  }

  submitFormData(formData: unknown) {
    let requestData = formData as CreateWorksheetRequest;
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
      harvestHours: +requestData.harvestHours,
      statusId: WORKSHEET_STATUS.READY_FOR_STOCKING,
    };
    this.worksheetFacadeService.createWorksheets(requestData);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
