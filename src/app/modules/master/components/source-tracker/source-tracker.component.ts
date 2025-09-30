import { Component } from '@angular/core';
import { USER_ACTIONS, WORKSHEET_OUTPUT_UNITS } from '@app/shared/constants/shared.contants';
import { formSTDetails, formSTConfig } from './source-tracker.config';
import { distinctUntilChanged, from, Subject, takeUntil } from 'rxjs';
import { SourceTracker, SourceTrackerList, WorksheetUnit } from '@app/shared/models/master';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { CreateSourceTrackerRequest } from '@app/shared/models/create-source-tracker';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-source-tracker',
  standalone: false,
  templateUrl: './source-tracker.component.html',
  providers: [DatePipe],
  styleUrl: './source-tracker.component.scss',
})
export class SourceTrackerComponent {
  private unSubscribe = new Subject<void>();
  userAction = USER_ACTIONS.LIST;
  userActions = USER_ACTIONS;
  tableData: unknown[] = [];
  formSTConfigData = formSTConfig;
  formSTDetails = formSTDetails;
  displayColumns = ['source_origin', 'source_count', 'created_date', 'actions'];
  sourceTrackerDetails!: SourceTracker;
  extraInfos: { label: string; value: string | number }[] = [];
  worksheetUnit: WorksheetUnit[] = [];
  editId: number | null = null;

  constructor(
    private sharedFacadeService: SharedFacadeService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getSourceTrackerDetails();
    this.sharedFacadeService.resetSourceTrackerUpdated$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res: boolean) => {
        if (res) {
          this.sharedFacadeService.resetSourceTrackerUpdatedStatus();
          this.userAction = USER_ACTIONS.LIST;
          this.editId = null;
          this.getSourceTrackerDetails();
        }
      });
  }
  getSourceTrackerDetails() {
    const fromdate = new Date();
    const toDate = new Date();
    setTimeout(() => {
      this.sharedFacadeService.getSourceTrackerList({ fromDate: fromdate, toDate: toDate });
    }, 100);
    this.sharedFacadeService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.worksheetUnit = data?.worksheetUnits || [];
        this.formSTConfigData = this.formSTConfigData.map((cfg) => {
          if (cfg.name === 'unitSource') {
            return {
              ...cfg,
              options: this.worksheetInputUnits,
            };
          }
          return cfg;
        });
      });
    this.sharedFacadeService.sourceTracker$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.sourceTrackerDetails = data || [];
        this.tableData = this.sourceTrackerDetails.list.map((sourceTracker) => ({
          ...sourceTracker,
          source_origin: sourceTracker.sourceOrigin,
          source_count: `${sourceTracker.count} ${this.getWorksheetUnitLabel(sourceTracker.unitSource)}`,
          created_date: this.datePipe.transform(sourceTracker.generatedAt, 'MMM d, y h:mm a'),

          enableEdit: true,
        }));
        this.extraInfos = this.sourceTrackerDetails.count.map((countInfo) => ({
          label: `Total ${this.getWorksheetUnitLabel(countInfo.unitSource)}`,
          value: countInfo.totalCount,
        }));
      });
  }

  applyFilter(event: unknown) {
    const date = event as { startDate: Date; endDate: Date };
    if (date) {
      const { startDate, endDate } = date;
      this.sharedFacadeService.getSourceTrackerList({ fromDate: startDate, toDate: endDate });
    }
  }

  get worksheetInputUnits() {
    return this.worksheetUnit
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
      });
  }

  getWorksheetUnitLabel(unitId: number) {
    const unit = this.worksheetInputUnits.find((u) => u.id === unitId);
    return unit ? unit.label : '';
  }

  addNew() {
    this.userAction = USER_ACTIONS.ADD;
    this.formSTDetails = { ...this.formSTDetails, title: 'Add New Source' };
  }

  editDetails(event: unknown) {
    const sourceTrackerDetails = event as SourceTrackerList;
    this.editId = sourceTrackerDetails.id;
    this.formSTConfigData = this.formSTConfigData.map((data) => {
      return {
        ...data,
        value: sourceTrackerDetails[data.name as keyof SourceTrackerList] || '',
      };
    });
    this.userAction = USER_ACTIONS.EDIT;
    this.formSTDetails = { ...this.formSTDetails, title: 'Update Source Tracker Details' };
  }

  deleteDetails(event: unknown) {
    const source = event as SourceTrackerList;
    const data = {
      title: 'Delete Source Entry',
      message: `Are you sure want to delete the entry <b>${source.sourceOrigin} ${source.count} ${this.getWorksheetUnitLabel(source.unitSource)}</b>?`,
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });
    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.sharedFacadeService.deleteSourceTracker(source.id);
      }
    });
  }

  moveBack() {
    this.userAction = USER_ACTIONS.LIST;
  }
  submitFormData(formData: unknown) {
    const payload = formData as CreateSourceTrackerRequest;
    if (this.userAction === USER_ACTIONS.EDIT) {
      this.sharedFacadeService.updateSourceTracker({
        ...payload,
        count: payload.count ? parseInt(payload.count.toString(), 10) : 0,
        id: this.editId || 0,
      });
    } else {
      this.sharedFacadeService.createSourceTracker({
        ...payload,
        count: payload.count ? parseInt(payload.count.toString(), 10) : 0,
      });
    }
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
