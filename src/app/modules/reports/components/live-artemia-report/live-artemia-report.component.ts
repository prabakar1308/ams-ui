import { ChangeDetectorRef, Component, Input, signal } from '@angular/core';
import { ReportFacadeService } from '../../services/report-facade.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Transit, TransitReport } from '../../models/transit-response';
import { frozenCupsToOutputFormat, millionsToOutputFormat } from '../../utils';
import { DatePipe } from '@angular/common';
import { UNIT_IDS } from '@app/shared/constants/shared.contants';

@Component({
  selector: 'app-live-artemia-report',
  standalone: false,
  templateUrl: './live-artemia-report.component.html',
  styleUrl: './live-artemia-report.component.scss',
  providers: [DatePipe],
})
export class LiveArtemiaReportComponent {
  @Input() unitId: number = UNIT_IDS.MILLIONS;
  @Input() dateValue = { startDate: new Date(), endDate: new Date() };

  private unSubscribe = new Subject<void>();
  transitReports: TransitReport[] = [];
  displayColumns = ['tank', 'date', 'transitBy', 'count', 'inCharge'];
  totalCountText = '';
  dataExists = true;
  reportPayload = {
    unitId: this.unitId,
    startDate: '',
    endDate: '',
  };

  constructor(
    private reportFacadeService: ReportFacadeService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.reportFacadeService.transitReport$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => {
        this.dataExists = res.length !== 0;
        this.transitReports = res;
        const totalCount = this.transitReports.reduce((acc, report) => {
          return acc + (this.unitId === UNIT_IDS.MILLIONS ? report.millions : report.frozenCups);
        }, 0);
        this.totalCountText = this.getTotalCount(totalCount);
        this.cdr.detectChanges();
      });
  }

  ngOnChanges(): void {
    this.updateReportdata();
  }

  // initializeReportData() {
  //   const currentDate = new Date();
  //   const thirtyDaysBefore = new Date();
  //   thirtyDaysBefore.setDate(currentDate.getDate() - 30);
  //   this.dateValue = { startDate: thirtyDaysBefore, endDate: currentDate };
  //   this.updateReportdata();
  // }

  updateReportdata() {
    const startDate = this.formatDate(this.dateValue.startDate);
    const endDate = this.formatDate(this.dateValue.endDate);
    this.reportFacadeService.getTransitReport({
      unitId: this.unitId,
      startDate,
      endDate,
    });
  }

  getShiftData(data: Transit[]) {
    return data.map((item) => ({
      tank: item.worksheet ? `${item.worksheet.tankType} - #${item.worksheet.tankNumber}` : '-',
      date: this.datePipe.transform(item.createdAt, 'MMM d, y h:mm a'),
      transitBy: item.createdBy || '-',
      count: item.transitCount,
      inCharge: item.staffInCharge,
    }));
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-M-d') || '';
  }

  getTotalCount(count: number): string {
    if (this.unitId === UNIT_IDS.MILLIONS) return millionsToOutputFormat(count);
    else return frozenCupsToOutputFormat(count);
  }

  dateChange(event: unknown): void {
    const date: { start: string; end: string } = event as { start: string; end: string };
    if (date) {
      const { start, end } = date;
      this.dateValue = { startDate: new Date(start), endDate: new Date(end) };
      this.updateReportdata();
    }
  }
}
