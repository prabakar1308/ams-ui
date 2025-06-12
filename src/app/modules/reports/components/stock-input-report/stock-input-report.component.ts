import { Component, Input } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ReportFacadeService } from '../../services/report-facade.service';
import { DatePipe } from '@angular/common';
import { TANK_TYPES } from '@app/shared/constants/shared.contants';
import { StockInputUnit } from '../../models/stock-input';

@Component({
  selector: 'app-stock-input-report',
  standalone: false,
  templateUrl: './stock-input-report.component.html',
  styleUrl: './stock-input-report.component.scss',
  providers: [DatePipe],
})
export class StockInputReportComponent {
  @Input() dateValue = { startDate: new Date(), endDate: new Date() };

  private unSubscribe = new Subject<void>();
  machineryData: StockInputUnit[] = [];
  conventionalData: StockInputUnit[] = [];
  overallData: StockInputUnit[] = [];
  dataExists = true;

  constructor(
    private reportFacadeService: ReportFacadeService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.reportFacadeService.stockInputReport$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => {
        const { byTankType, overall } = res;
        const machineryData = byTankType.filter((item) => item.tankTypeId === TANK_TYPES.MACHINERY);
        const conventionalData = byTankType.filter(
          (item) => item.tankTypeId === TANK_TYPES.CONVENTIONAL,
        );

        if (machineryData.length > 0) this.machineryData = machineryData[0].inputUnits;
        if (conventionalData.length > 0) this.conventionalData = conventionalData[0].inputUnits;
        this.overallData = overall;

        this.dataExists =
          this.machineryData.length > 0 ||
          this.conventionalData.length > 0 ||
          this.overallData.length > 0;
      });
  }

  ngOnChanges(): void {
    this.updateReportdata();
  }

  updateReportdata() {
    const startDate = this.formatDate(this.dateValue.startDate);
    const endDate = this.formatDate(this.dateValue.endDate);
    this.reportFacadeService.getStockInputReport({
      startDate,
      endDate,
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-M-d') || '';
  }

  getUnitName(item: StockInputUnit): string {
    const { name, brand, spec } = item;
    return `${name} ${brand ? `- ${brand}` : ''} ${spec ? ` (${spec})` : ''}`.trim();
  }
}
