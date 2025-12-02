import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { distinctUntilChanged, from, Subject, takeUntil } from 'rxjs';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

import { USER_ACTIONS, WORKSHEET_OUTPUT_UNITS } from '@app/shared/constants/shared.contants';
import { SourceTracker, SourceTrackerList, WorksheetUnit } from '@app/shared/models/master';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { CreateSourceTrackerRequest } from '@app/shared/models/create-source-tracker';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { LoaderService } from '@app/core/services/loader.service';
import { formSTDetails, formSTConfig } from './source-tracker.config';

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
  displayColumns = ['source_origin', 'source_count', 'stocked_date', 'actions'];
  sourceTrackerDetails!: SourceTracker;
  extraInfos: { label: string; value: string | number }[] = [];
  worksheetUnit: WorksheetUnit[] = [];
  editId: number | null = null;

  constructor(
    private sharedFacadeService: SharedFacadeService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private loaderService: LoaderService,
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
    fromdate.setDate(toDate.getDate() - 29); // last 30 days
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
          stocked_date: this.datePipe.transform(sourceTracker.generatedAt, 'MMM d, y h:mm a'),

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

  generatePDF() {
    const elementsToHide = document.querySelectorAll('.hide-in-pdf');
    elementsToHide.forEach((el) => ((el as HTMLElement).style.display = 'none'));

    const elementsToShow = document.querySelectorAll('.show-in-pdf');
    elementsToShow.forEach((el) => ((el as HTMLElement).style.display = 'block'));

    this.loaderService.show();
    const screenWidth = window.innerWidth;
    const data = document.getElementById('source-tracker-content');
    if (data) {
      let width = screenWidth;
      if (screenWidth) {
        if (screenWidth > 1600) width = screenWidth - 400;
        else if (screenWidth > 1200) width = screenWidth - 300;
        else if (screenWidth > 1000) width = screenWidth - 200;
        else if (screenWidth > 900) width = screenWidth - 100;
      }
      html2canvas(data, {
        width: width + 100,
        height: screenWidth < 720 ? 3500 : 2500,
        scale: 2,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4', true);

        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        // Calculate image dimensions to fit PDF width while maintaining aspect ratio
        const imgProps = {
          width: canvas.width,
          height: canvas.height,
        };
        const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
        const imgWidth = imgProps.width * ratio;
        const imgHeight = imgProps.height * ratio;

        // Center the image horizontally
        const x = (pdfWidth - imgWidth) / 2;
        const y = 10; // You can also center vertically if needed

        doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

        // Append date and time to PDF name
        const now = new Date();
        const dateStr = [
          now.getFullYear(),
          String(now.getMonth() + 1).padStart(2, '0'),
          String(now.getDate()).padStart(2, '0'),
        ].join('-');
        const timeStr = [
          String(now.getHours()).padStart(2, '0'),
          String(now.getMinutes()).padStart(2, '0'),
          String(now.getSeconds()).padStart(2, '0'),
        ].join('-');
        const fileName = `Source_Tracker_${dateStr}_${timeStr}.pdf`;

        doc.save(fileName);
        this.loaderService.hide();
      });
    }
    // Restore elements after PDF is generated
    elementsToHide.forEach((el) => ((el as HTMLElement).style.display = ''));
    elementsToShow.forEach((el) => ((el as HTMLElement).style.display = 'none'));
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
