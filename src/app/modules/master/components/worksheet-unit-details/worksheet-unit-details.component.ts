import { Component } from '@angular/core';
import { USER_ACTIONS } from '@app/shared/constants/shared.contants';
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

  displayColumns = ['value_name', 'brand_name', 'specification', 'actions'];

  constructor(public sharedService: SharedFacadeService) {}

  ngOnInit() {
    this.getWorksheetUnitDetails();
  }
  getWorksheetUnitDetails() {
    this.sharedService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        console.log('Master data updated:', data);
        this.worksheetUnitDetails = data?.worksheetUnits || [];
        this.tableData = this.worksheetUnitDetails.map((unit) => ({
          ...unit,
          value_name: unit.value,
          brand_name: unit.brand,
          specification: unit.specs,
        }));
      });
  }

  addNew() {
    this.userAction = USER_ACTIONS.ADD;
    this.formWsDetails = { ...this.formWsDetails, title: 'Add Worksheet Details' };
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
    this.formWsDetails = { ...this.formWsDetails, title: 'Update Worksheet Details' };
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
