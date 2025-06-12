import { Component, viewChild } from '@angular/core';
import { ReportFacadeService } from '../../services/report-facade.service';
import { UNIT_IDS } from '@app/shared/constants/shared.contants';
import { MatAccordion } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { TransitReport } from '../../models/transit-response';

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
  ) {}
  unitIds = UNIT_IDS;
  selectedIndex = 0;
  dateValue = { startDate: new Date(), endDate: new Date() };
  liveTransits: TransitReport[] = [];
  frozenTransits: TransitReport[] = [];

  ngOnInit() {
    const currentDate = new Date();
    const thirtyDaysBefore = new Date();
    thirtyDaysBefore.setDate(currentDate.getDate() - 30);
    this.dateValue = { startDate: thirtyDaysBefore, endDate: currentDate };
    this.updateReportdata();

    this.reportFacadeService.liveTransitReport$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => (this.liveTransits = res));

    this.reportFacadeService.frozenTransitReport$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => (this.frozenTransits = res));
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

  generateReport(): void {
    console.log('g');
  }
}
