import { Component } from '@angular/core';
import { FORM_CONTROL_NAMES, formConfig, formDetails } from './harvest.config';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { combineLatest, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';
import { WorksheetTank } from '@app/worksheet/models/active-worksheet';
import { CreateHarvest } from '@app/worksheet/models/create-harvest';
import {
  HARVEST_TYPES,
  UNIT_IDS,
  WORKSHEET_OUTPUT_UNITS,
  WORKSHEET_STATUS,
  WORKSHEET_TABLE_STATUS,
} from '@app/shared/constants/shared.contants';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { HarvestDetails } from '@app/worksheet/models/harvest-details';
import { FormDetails } from '@app/shared/models/generic-form';

@Component({
  selector: 'app-harvest-create',
  standalone: false,
  templateUrl: './harvest-create.component.html',
  styleUrl: './harvest-create.component.scss',
})
export class HarvestCreateComponent {
  private unSubscribe = new Subject<void>();
  formConfigData = formConfig;
  formDetails = formDetails;
  worksheet!: WorksheetTank;
  harvest: HarvestDetails | null = null;
  editId = 0;
  additionalDetails: FormDetails[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedFacadeService: SharedFacadeService,
    private authFacadeService: AuthFacadeService,
    private worksheetFacadeService: WorksheetFacadeService,
  ) {}

  ngOnInit() {
    const worksheet = localStorage.getItem('worksheet');
    if (worksheet) {
      this.worksheet = JSON.parse(worksheet);
      this.updateTags();
    }

    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        const id = Number(params['id']);
        this.editId = id;
        this.worksheetFacadeService.getCurrentHarvest(id);
        this.formDetails = {
          ...this.formDetails,
          title: 'Update Harvest',
          description: 'Modify harvest details',
        };
      }
    });

    combineLatest([
      this.sharedFacadeService.masterData$,
      this.sharedFacadeService.userData$,
      this.authFacadeService.userData$,
      this.worksheetFacadeService.currentHarvest$,
    ])
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(([masterData, userData, currentUserData, currentHarvest]) => {
        this.harvest = currentHarvest;

        if (this.harvest && this.editId) {
          this.worksheet = this.harvest.worksheet;
          this.updateTags();
          this.additionalDetails = [];
          this.additionalDetails.push({
            label: 'Status',
            value:
              this.harvest.status === WORKSHEET_TABLE_STATUS.PARTIALLY_COMPLETED
                ? 'Partially Completed'
                : 'Active',
          });
          this.additionalDetails.push({
            label: 'Count Instock',
            value: `${this.harvest.countInStock} ${this.harvest.unit?.value}`,
          });
        }
        // Update formConfigData based on tankSelection and activeWorksheets
        this.formConfigData = this.formConfigData.map((data) => {
          switch (data.name) {
            case FORM_CONTROL_NAMES.COUNT:
              return {
                ...data,
                value: this.editId && this.harvest ? this.harvest.count : data.value,
                validations: this.updateCountValidations(),
              };
            case FORM_CONTROL_NAMES.UNIT_ID:
              return {
                ...data,
                disabled:
                  this.editId &&
                  this.harvest &&
                  this.harvest.status === WORKSHEET_TABLE_STATUS.PARTIALLY_COMPLETED
                    ? true
                    : false,
                value:
                  this.editId && this.harvest && this.harvest.unit
                    ? this.harvest.unit.id
                    : data.value,
                options: masterData?.worksheetUnits
                  .filter((unit) => WORKSHEET_OUTPUT_UNITS.includes(unit.id))
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
                meta: {
                  ...data.meta,
                  hint:
                    this.editId &&
                    this.harvest &&
                    this.harvest.status === WORKSHEET_TABLE_STATUS.PARTIALLY_COMPLETED
                      ? 'Cannot be changed as it is partially transited'
                      : '',
                },
              };

            case FORM_CONTROL_NAMES.MEASURED_BY:
              return {
                ...data,
                value:
                  this.editId && this.harvest && this.harvest.measuredBy
                    ? this.harvest.measuredBy.id
                    : currentUserData?.userId,
                options: userData.map((user) => ({
                  ...user,
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                })),
              };
            case FORM_CONTROL_NAMES.RESTOCK_COUNT:
              return {
                ...data,
                value: this.editId && this.harvest ? this.harvest.restockCount : data.value,
                disabled:
                  (this.editId && this.harvest && this.harvest.restockStatus
                    ? this.harvest.restockStatus !== WORKSHEET_TABLE_STATUS.ACTIVE
                    : false) || this.isRestockHarvest(),
                meta: {
                  ...data.meta,
                  hint:
                    this.editId &&
                    this.harvest &&
                    this.harvest.restockStatus &&
                    this.harvest.restockStatus !== WORKSHEET_TABLE_STATUS.ACTIVE
                      ? 'There is a worksheet already created using this restock'
                      : 'Add restock count in millions',
                },
              };

            case FORM_CONTROL_NAMES.GENERATED_AT:
              return {
                ...data,
                value: this.editId && this.harvest ? this.harvest.generatedAt : data.value,
              };
            default:
              return data;
          }
        });
      });
  }

  updateCountValidations() {
    const validations = [
      {
        name: 'required',
        validator: 'required',
        message: 'Count is required',
        value: 0,
      },
    ];

    if (
      this.editId &&
      this.harvest &&
      this.harvest.status === WORKSHEET_TABLE_STATUS.PARTIALLY_COMPLETED
    ) {
      const transitCount = this.harvest.count - this.harvest.countInStock;
      if (transitCount > 0) {
        validations.push({
          name: 'min',
          validator: 'min',
          value: transitCount,
          message: `Minimum of ${transitCount} is required to match the existing transit.`,
        });
      }
    }
    return validations;
  }

  updateTags() {
    const tags = [];
    if (this.worksheet.tankType) tags.push(this.worksheet.tankType.value);
    if (this.worksheet.tankNumber) tags.push(`Tank ${this.worksheet.tankNumber}`);
    if (this.worksheet.harvestType) tags.push(this.worksheet.harvestType.value);

    this.formDetails = {
      ...this.formDetails,
      tags,
    };
  }

  isRestockHarvest() {
    return this.worksheet.harvestType && this.worksheet.harvestType.id === HARVEST_TYPES.RESTOCKING;
  }

  goToHomePage() {
    this.router.navigate(['/worksheet/harvest']);
  }

  submitFormData(formData: unknown) {
    let requestData = formData as CreateHarvest;
    const count = parseInt(requestData.count.toString(), 10);

    if (this.editId) {
      const restockCount =
        requestData.restockCount || requestData.restockCount === ''
          ? parseInt((requestData.restockCount || '0').toString(), 10)
          : undefined;
      const transitCount = this.harvest ? this.harvest.count - this.harvest.countInStock : 0;
      requestData = {
        ...requestData,
        id: this.editId,
        count,
        countInStock: count - transitCount,
        restockCount,
        generatedAt: requestData.generatedAt || new Date(),
      };
      this.worksheetFacadeService.updateHarvest(requestData);
    } else {
      const restockCount = parseInt((requestData.restockCount || '0').toString(), 10);
      // const transitCount = parseInt((requestData.transitCount || '0').toString(), 10);
      // const countInStock = count - transitCount;

      requestData = {
        ...requestData,
        divider: undefined,
        worksheetId: this.worksheet.worksheetId || 0,
        count,
        countInStock: count,
        restockCount,
        statusId: WORKSHEET_STATUS.COMPLETED,
        restockUnitId: restockCount ? UNIT_IDS.MILLIONS : undefined,
        generatedAt: requestData.generatedAt || new Date(),
      };

      this.worksheetFacadeService.createHarvest({ harvests: [requestData] });
    }
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
    localStorage.removeItem('worksheet');
  }
}
