import { Component } from '@angular/core';
import { FORM_CONTROL_NAMES, formConfig, formDetails } from './harvest.config';
import { Router } from '@angular/router';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { combineLatest, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';
import { WorksheetTank } from '@app/worksheet/models/active-worksheet';
import { CreateHarvest } from '@app/worksheet/models/create-harvest';
import {
  DEFAULT_RESTOCK_UNIT_ID,
  UNIT_IDS,
  WORKSHEET_STATUS,
} from '@app/shared/constants/shared.contants';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';

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

  constructor(
    private router: Router,
    private sharedFacadeService: SharedFacadeService,
    private authFacadeService: AuthFacadeService,
    private worksheetFacadeService: WorksheetFacadeService,
  ) {}

  ngOnInit() {
    const worksheet = localStorage.getItem('worksheet');
    if (worksheet) {
      this.worksheet = JSON.parse(worksheet);
      const tags = [];
      if (this.worksheet.tankType) tags.push(this.worksheet.tankType.value);
      if (this.worksheet.tankNumber) tags.push(`Tank ${this.worksheet.tankNumber}`);
      if (this.worksheet.harvestType) tags.push(this.worksheet.harvestType.value);

      this.formDetails = {
        ...this.formDetails,
        tags,
      };
    }

    combineLatest([
      this.sharedFacadeService.masterData$,
      this.sharedFacadeService.userData$,
      this.authFacadeService.userData$,
    ])
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(([masterData, userData, currentUserData]) => {
        // Update formConfigData based on tankSelection and activeWorksheets
        this.formConfigData = this.formConfigData.map((data) => {
          switch (data.name) {
            case FORM_CONTROL_NAMES.UNIT_ID:
              return {
                ...data,
                options: masterData?.units.map((unit) => {
                  if (unit.id === UNIT_IDS.FROZEN_CUPS) {
                    return {
                      ...unit,
                      label: unit.value,
                      value: unit.id,
                      hide: [
                        FORM_CONTROL_NAMES.DIVIDER,
                        FORM_CONTROL_NAMES.TRANSIT_COUNT,
                        FORM_CONTROL_NAMES.UNIT_SECTOR_ID,
                      ],
                    };
                  }
                  return {
                    ...unit,
                    label: unit.value,
                    value: unit.id,
                  };
                }),
              };

            case FORM_CONTROL_NAMES.MEASURED_BY:
              return {
                ...data,
                value: currentUserData?.userId,
                options: userData.map((user) => ({
                  ...user,
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                })),
              };
            case FORM_CONTROL_NAMES.UNIT_SECTOR_ID:
              return {
                ...data,
                options: masterData?.unitSectors.map((unit) => ({
                  ...unit,
                  label: unit.name,
                  value: unit.id,
                })),
              };

            default:
              return data;
          }
        });
      });
  }

  goToHomePage() {
    this.router.navigate(['/worksheet/harvest']);
  }

  submitFormData(formData: unknown) {
    let requestData = formData as CreateHarvest;

    const count = parseInt(requestData.count.toString(), 10);
    const restockCount = parseInt((requestData.restockCount || '0').toString(), 10);
    const transitCount = parseInt((requestData.transitCount || '0').toString(), 10);
    const countInStock = count - transitCount;

    requestData = {
      ...requestData,
      divider: undefined,
      worksheetId: this.worksheet.worksheetId || 0,
      count,
      countInStock,
      restockCount,
      transitCount,
      statusId: WORKSHEET_STATUS.COMPLETED,
      restockUnitId: restockCount ? DEFAULT_RESTOCK_UNIT_ID : undefined,
    };

    this.worksheetFacadeService.createHarvest({ harvests: [requestData] });
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
    localStorage.removeItem('worksheet');
  }
}
