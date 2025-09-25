import { Component } from '@angular/core';
import { USER_ACTIONS } from '@app/shared/constants/shared.contants';
import { formSTDetails, formSTConfig } from './source-tracker.config';
import { distinctUntilChanged, from, Subject, takeUntil } from 'rxjs';
import { SharedService } from '@app/shared/service/shared-service';
import { SourceTracker, WorksheetUnit } from '@app/shared/models/master';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';

@Component({
  selector: 'app-source-tracker',
  standalone: false,
  templateUrl: './source-tracker.component.html',
  styleUrl: './source-tracker.component.scss',
})
export class SourceTrackerComponent {
  private unSubscribe = new Subject<void>();
  userAction = USER_ACTIONS.LIST;
  userActions = USER_ACTIONS;
  tableData: unknown[] = [];
  formSTConfigData = formSTConfig;
  formSTDetails = formSTDetails;
  displayColumns = ['Id', 'source_origin', 'count', 'source_unit', 'generated_at', 'actions'];
  sourceTrackerDetails: SourceTracker[] = [];
  worksheetUnit: WorksheetUnit[] = [];

  constructor(private sharedFacadeService: SharedFacadeService) {}

  ngOnInit() {
    this.sharedFacadeService.getMasterData();
    this.sharedFacadeService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.worksheetUnit = data?.worksheetUnits || [];
      });
    this.getSourceTrackerDetails();
  }
  getSourceTrackerDetails() {
    const fromdate = new Date();
    const toDate = new Date();
    fromdate.setDate(toDate.getDate() - 30);
    this.sharedFacadeService.getSourceTrackerList({ fromDate: fromdate, toDate: toDate });
    this.sharedFacadeService.sourceTrackerList$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.sourceTrackerDetails = data || [];
        this.tableData = this.sourceTrackerDetails.map((sourceTracker) => ({
          ...sourceTracker,
          Id: sourceTracker.id,
          source_origin: sourceTracker.sourceOrigin,
          count: sourceTracker.count,
          source_unit:
            this.worksheetUnit.filter((x) => x.id == sourceTracker.unitSource)[0]?.value || '',
          generated_at: sourceTracker.generatedAt,
          enableEdit: true,
        }));
      });
  }

  addNew() {
    this.userAction = USER_ACTIONS.ADD;
    this.formSTDetails = { ...this.formSTDetails, title: 'Add Source Tracker Details' };
  }

  editDetails(event: unknown) {
    console.log('Edit event:', event);
    // const worksheetUnitDetails = event as WorksheetUnit;
    // this.editId = worksheetUnitDetails.id;
    // this.formWsConfigData = this.formWsConfigData.map((data) => {
    //   return {
    //     ...data,
    //     value: worksheetUnitDetails[data.name as keyof WorksheetUnit] || '',
    //   };
    // });
    // this.userAction = USER_ACTIONS.EDIT;
    // this.formWsDetails = { ...this.formWsDetails, title: 'Update Worksheet Details' };
  }

  deleteDetails(event: unknown) {
    console.log('Delete event:', event);
  }

  moveBack() {
    this.userAction = USER_ACTIONS.LIST;
  }
  submitFormData(formData: unknown) {
    // const payload = formData as CreateWorksheetUnitRequest;
    // if (this.userAction === USER_ACTIONS.EDIT) {
    //   this.sharedService.updateWorksheetUnit({
    //     ...payload,
    //     id: this.editId || 0,
    //   });
    // } else {
    //   this.sharedService.createWorksheetUnit({
    //     ...payload,
    //   });
    // }
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
