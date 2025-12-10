import { Component } from '@angular/core';
import { UNIT_IDS, USER_ACTIONS } from '@app/shared/constants/shared.contants';
import { WorksheetUnit } from '@app/shared/models/master';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { distinctUntilChanged, from, Subject, takeUntil } from 'rxjs';
import { formWsConfig, formWsDetails } from './worksheet-unit.config';
import { CreateWorksheetUnitRequest } from '@app/shared/models/create-worksheet-unit';

@Component({
  selector: 'app-worksheet-unit-details',
  standalone: false,
  templateUrl: './worksheet-unit-details.component.html',
  styleUrl: './worksheet-unit-details.component.scss',
})
export class WorksheetUnitDetailsComponent {
  userAction = USER_ACTIONS.LIST;
  private unSubscribe = new Subject<void>();
  worksheetUnitDetails: WorksheetUnit[] = [];
  tableData: unknown[] = [];
  userActions = USER_ACTIONS;
  formWsConfigData = formWsConfig;
  formWsDetails = formWsDetails;
  editId: number | null = null;

  displayColumns = ['type', 'brand', 'specification', 'actions'];

  constructor(public sharedService: SharedFacadeService) {}

  ngOnInit() {
    this.getWorksheetUnitDetails();
    this.sharedService.resetWorksheetUnitUpdated$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res: boolean) => {
        if (res) {
          this.sharedService.resetWorksheetUnitUpdateStatus();
          this.userAction = USER_ACTIONS.LIST;
          this.editId = null;
          this.sharedService.getMasterData();
        }
      });
  }
  getWorksheetUnitDetails() {
    this.sharedService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.worksheetUnitDetails = data?.worksheetUnits || [];
        this.tableData = this.worksheetUnitDetails
          .filter((unit) => unit.id !== UNIT_IDS.MILLIONS && unit.id !== UNIT_IDS.FROZEN_CUPS)
          .map((unit) => ({
            ...unit,
            type: unit.value,
            brand: unit.brand,
            specification: unit.specs,
            enableEdit: true,
          }));
      });
  }

  addNew() {
    this.userAction = USER_ACTIONS.ADD;
    this.formWsDetails = { ...this.formWsDetails, title: 'Add Worksheet Input Type' };
  }

  editDetails(event: unknown) {
    console.log('Edit event:', event);
    const worksheetUnitDetails = event as WorksheetUnit;
    this.editId = worksheetUnitDetails.id;
    this.formWsConfigData = this.formWsConfigData.map((data) => {
      return {
        ...data,
        value: worksheetUnitDetails[data.name as keyof WorksheetUnit] || '',
      };
    });
    this.userAction = USER_ACTIONS.EDIT;
    this.formWsDetails = { ...this.formWsDetails, title: 'Update Worksheet Input Type' };
  }
  deleteDetails(event: unknown) {
    console.log('Delete event:', event);
  }

  moveBack() {
    this.userAction = USER_ACTIONS.LIST;
    //this.sharedService.resetUserUpdateStatus();
  }
  submitFormData(formData: unknown) {
    const payload = formData as CreateWorksheetUnitRequest;
    if (this.userAction === USER_ACTIONS.EDIT) {
      this.sharedService.updateWorksheetUnit({
        ...payload,
        id: this.editId || 0,
      });
    } else {
      this.sharedService.createWorksheetUnit({
        ...payload,
      });
    }
  }
  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
