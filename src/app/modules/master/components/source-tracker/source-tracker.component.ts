import { Component } from '@angular/core';
import { USER_ACTIONS } from '@app/shared/constants/shared.contants';
import { formSTDetails, formSTConfig } from './source-tracker.config';
import { distinctUntilChanged, from, Subject, takeUntil } from 'rxjs';
import { SharedService } from '@app/shared/service/shared-service';
import { SourceTracker, WorksheetUnit } from '@app/shared/models/master';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { CreateSourceTrackerRequest } from '@app/shared/models/create-source-tracker';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';

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
  displayColumns = ['source_origin', 'count', 'source_unit', 'generated_at', 'actions'];
  sourceTrackerDetails: SourceTracker[] = [];
  worksheetUnit: WorksheetUnit[] = [];
  editId: number | null = null;
  currentUserId: number = 0;

  constructor(
    private sharedFacadeService: SharedFacadeService,
    private authFacadeService: AuthFacadeService,
  ) {}

  ngOnInit() {
    this.sharedFacadeService.getMasterData();

    this.getSourceTrackerDetails();
    this.sharedFacadeService.resetWorksheetUnitUpdated$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res: boolean) => {
        if (res) {
          this.sharedFacadeService.resetSourceTrackerUpdatedStatus();
          this.userAction = USER_ACTIONS.LIST;
          this.editId = null;
          //this.sharedFacadeService.getMasterData();
        }
      });
  }
  getSourceTrackerDetails() {
    const fromdate = new Date();
    const toDate = new Date();
    fromdate.setDate(toDate.getDate() - 30);
    this.sharedFacadeService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.worksheetUnit = data?.worksheetUnits || [];
      });
    this.sharedFacadeService.getSourceTrackerList({ fromDate: fromdate, toDate: toDate });
    this.sharedFacadeService.sourceTrackerList$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.sourceTrackerDetails = data || [];
        this.tableData = this.sourceTrackerDetails.map((sourceTracker) => ({
          ...sourceTracker,
          source_origin: sourceTracker.sourceOrigin,
          count: sourceTracker.count,
          source_unit: sourceTracker.unitSource, //need to workout
          //this.worksheetUnit.filter((x) => x.id == sourceTracker.unitSource)[0]?.value || '',
          generated_at: sourceTracker.generatedAt,
          enableEdit: true,
        }));
        //need to workout
        this.formSTConfigData.map((cfg) => {
          if (cfg.name === 'unitSource') {
            return {
              ...cfg,
              options: this.worksheetUnit.map((unit) => ({
                id: unit.id,
                name: unit.value,
              })),
            };
          }
          return cfg;
        });
      });
    this.authFacadeService.userData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((userData) => {
        if (userData) {
          this.currentUserId = parseInt(userData.userId);
        }
      });
  }

  addNew() {
    this.userAction = USER_ACTIONS.ADD;
    this.formSTDetails = { ...this.formSTDetails, title: 'Add Source Tracker Details' };
  }

  editDetails(event: unknown) {
    console.log('Edit event:', event);
    const sourceTrackerDetails = event as SourceTracker;
    this.editId = sourceTrackerDetails.id;
    this.formSTConfigData = this.formSTConfigData.map((data) => {
      return {
        ...data,
        value: sourceTrackerDetails[data.name as keyof SourceTracker] || '',
      };
    });
    this.userAction = USER_ACTIONS.EDIT;
    this.formSTDetails = { ...this.formSTDetails, title: 'Update Source Tracker Details' };
  }

  deleteDetails(event: unknown) {
    console.log('Delete event:', event);
  }

  moveBack() {
    this.userAction = USER_ACTIONS.LIST;
  }
  submitFormData(formData: unknown) {
    const payload = formData as CreateSourceTrackerRequest;
    payload.createdBy = this.currentUserId;
    payload.updatedBy = this.currentUserId;
    payload.unitSource = 1; //need to workout
    if (this.userAction === USER_ACTIONS.EDIT) {
      this.sharedFacadeService.updateSourceTracker({
        ...payload,
        id: this.editId || 0,
      });
    } else {
      this.sharedFacadeService.createSourceTracker({
        ...payload,
      });
    }
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
