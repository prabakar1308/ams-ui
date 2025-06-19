import { ChangeDetectorRef, Component, Input, signal } from '@angular/core';
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
  @Input() data: TransitReport[] = [];
  @Input() unitId: number = UNIT_IDS.MILLIONS;
  @Input() dateValue = { startDate: new Date(), endDate: new Date() };

  expanded = signal(false);
  transitReports: TransitReport[] = [];
  displayColumns = ['tank', 'date', 'transit_by', 'count', 'in_charge'];
  totalCountText = '';
  dataExists = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.updateReportdata();
  }

  ngOnChanges(): void {
    this.updateReportdata();
  }

  toggle() {
    this.expanded.set(!this.expanded());
  }

  updateReportdata() {
    this.dataExists = this.data.length !== 0;
    this.transitReports = this.data;
    const totalCount = this.transitReports.reduce((acc, report) => {
      return acc + (this.unitId === UNIT_IDS.MILLIONS ? report.millions : report.frozenCups);
    }, 0);
    this.totalCountText = this.getTotalCount(totalCount);
    this.cdr.detectChanges();
  }

  getShiftData(data: Transit[]) {
    return data.map((item) => ({
      tank: item.worksheet ? `${item.worksheet.tankType} - #${item.worksheet.tankNumber}` : '-',
      date: this.datePipe.transform(item.createdAt, 'MMM d, y h:mm a'),
      transit_by: item.createdBy || '-',
      count: item.transitCount,
      in_charge: item.staffInCharge,
    }));
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-M-d') || '';
  }

  getTotalCount(count: number): string {
    if (this.unitId === UNIT_IDS.MILLIONS) return millionsToOutputFormat(count);
    else return frozenCupsToOutputFormat(count);
  }
}
