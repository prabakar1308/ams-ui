import { Component, viewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { MatAccordion } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { ReportFacadeService } from '../../services/report-facade.service';
import { UNIT_IDS } from '@app/shared/constants/shared.contants';
import { TransitReport } from '../../models/transit-response';
import { LoaderService } from '@app/core/services/loader.service';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { UnitSector } from '@app/shared/models/master';

@Component({
  selector: 'app-report-home',
  standalone: false,
  templateUrl: './report-home.component.html',
  styleUrl: './report-home.component.scss',
  providers: [DatePipe],
})
export class ReportHomeComponent {
  accordion = viewChild.required(MatAccordion);
  private unSubscribe = new Subject<void>();
  constructor(
    private reportFacadeService: ReportFacadeService,
    private datePipe: DatePipe,
    private loaderService: LoaderService,
    private sharedService: SharedFacadeService,
  ) {}
  unitIds = UNIT_IDS;
  selectedIndex = 0;
  dateValue = { startDate: new Date(), endDate: new Date() };
  liveTransits: TransitReport[] = [];
  filteredLiveTransits: TransitReport[] = [];
  frozenTransits: TransitReport[] = [];
  filteredFrozenTransits: TransitReport[] = [];
  unitSectors: UnitSector[] = [];
  selectedUnitSector: number | null = 0;

  ngOnInit() {
    const currentDate = new Date();
    const thirtyDaysBefore = new Date();
    thirtyDaysBefore.setDate(currentDate.getDate() - 30);
    this.dateValue = { startDate: thirtyDaysBefore, endDate: currentDate };
    this.updateReportdata();

    this.reportFacadeService.liveTransitReport$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => {
        this.liveTransits = res;
        this.filteredLiveTransits = res;
      });

    this.reportFacadeService.frozenTransitReport$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => {
        this.frozenTransits = res;
        this.filteredFrozenTransits = res;
      });

    this.reportFacadeService.getActiveStockInputReport();
    this.reportFacadeService.getAvailableStockInputReport();

    this.sharedService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.unitSectors = data?.unitSectors
          ? [{ id: 0, name: 'All', description: '' }, ...data.unitSectors]
          : [];
      });
  }

  onUnitSectorChange(unitSectorId: number) {
    if (unitSectorId === 0) {
      this.filteredLiveTransits = this.liveTransits;
      this.filteredFrozenTransits = this.frozenTransits;
    } else {
      this.filteredLiveTransits = this.liveTransits.filter(
        (transit) => transit.unitSector.id === unitSectorId,
      );
      this.filteredFrozenTransits = this.frozenTransits.filter(
        (transit) => transit.unitSector.id === unitSectorId,
      );
    }
  }

  onIndexChange(index: number) {
    this.selectedIndex = index;
  }

  dateChange(event: unknown): void {
    const date: { start: string; end: string } = event as { start: string; end: string };
    if (date) {
      const { start, end } = date;
      this.dateValue = { startDate: new Date(start), endDate: new Date(end) };
      this.updateReportdata();
    }
  }

  updateReportdata() {
    const startDate = this.formatDate(this.dateValue.startDate);
    const endDate = this.formatDate(this.dateValue.endDate);
    this.reportFacadeService.getLiveTransitReport({
      unitId: UNIT_IDS.MILLIONS,
      startDate,
      endDate,
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-M-d') || '';
  }

  generatePDF() {
    const elementsToHide = document.querySelectorAll('.hide-in-pdf');
    elementsToHide.forEach((el) => ((el as HTMLElement).style.display = 'none'));

    this.loaderService.show();
    const screenWidth = window.innerWidth;
    const data = document.getElementById('contentToConvert');
    if (data) {
      let width = screenWidth;
      if (screenWidth) {
        if (screenWidth > 1600) width = screenWidth - 400;
        else if (screenWidth > 1200) width = screenWidth - 300;
        else if (screenWidth > 1000) width = screenWidth - 200;
        else if (screenWidth > 900) width = screenWidth - 100;
      }
      html2canvas(data, {
        width,
        height: screenWidth < 720 ? 2800 : 2100,
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
        const fileName = `Artemia_Report_${dateStr}_${timeStr}.pdf`;

        doc.save(fileName);
        this.loaderService.hide();

        // Restore elements after PDF is generated
        elementsToHide.forEach((el) => ((el as HTMLElement).style.display = ''));
      });
    }
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
