import { Component, Input } from '@angular/core';
import { TransitTable } from '../../models/report';
import { Transit, TransitReport } from '../../models/transit-response';
import { frozenCupsToTins, millionsToTins } from '../../utils';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ReportFacadeService } from '../../services/report-facade.service';
import { StockInputUnit } from '../../models/stock-input';

@Component({
  selector: 'app-total-artemia-report',
  standalone: false,
  templateUrl: './total-artemia-report.component.html',
  styleUrl: './total-artemia-report.component.scss',
})
export class TotalArtemiaReportComponent {
  @Input() liveTransits: TransitReport[] = [];
  @Input() frozenTransits: TransitReport[] = [];
  @Input() dateValue = { startDate: new Date(), endDate: new Date() };
  private unSubscribe = new Subject<void>();
  displayColumns = ['unit_sector', 'day_shift_count', 'night_shift_count', 'total_count'];
  liveTableData: TransitTable[] = [];
  frozenTableData: TransitTable[] = [];
  overallStocks: StockInputUnit[] = [];
  overallActiveStocks: StockInputUnit[] = [];
  availableData: StockInputUnit[] = [];
  liveDataExists = true;
  liveTotalCountText = '';
  frozenDataExists = true;
  frozenTotalCountText = '';

  constructor(private reportFacadeService: ReportFacadeService) {}

  ngOnInit() {
    this.generateLiveTableData();
    this.generateFrozenTableData();

    this.reportFacadeService.stockInputReport$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => {
        const { overall } = res;
        this.overallStocks = overall;
      });

    this.reportFacadeService.activeStockInputReport$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => {
        const { overall } = res;
        this.overallActiveStocks = overall;
      });

    this.reportFacadeService.availableStockInputReport$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => (this.availableData = res));
  }

  ngOnChanges(): void {
    this.generateLiveTableData();
    this.generateFrozenTableData();
  }

  generateLiveTableData() {
    this.liveTableData = this.liveTransits.map((transit) => {
      const { dayShift, nightShift } = transit.shifts;
      const inchargeNames = this.getInchargeNames(dayShift.transits, nightShift.transits);
      return {
        unit_sector: `${transit.unitSector.name} (${inchargeNames})`,
        unit_sector_name: transit.unitSector.name,
        total_count: millionsToTins(transit.millions),
        day_shift_count: millionsToTins(dayShift.totalTransitCount),
        night_shift_count: millionsToTins(nightShift.totalTransitCount),
      };
    });

    this.liveDataExists = this.liveTransits.length !== 0;
    const totalCount = this.liveTransits.reduce((acc, report) => {
      return acc + report.millions;
    }, 0);
    this.liveTotalCountText = millionsToTins(totalCount);
  }

  generateFrozenTableData() {
    this.frozenTableData = this.frozenTransits.map((transit) => {
      const { dayShift, nightShift } = transit.shifts;
      const inchargeNames = this.getInchargeNames(dayShift.transits, nightShift.transits);
      return {
        unit_sector: `${transit.unitSector.name} (${inchargeNames})`,
        unit_sector_name: transit.unitSector.name,
        total_count: frozenCupsToTins(transit.frozenCups),
        day_shift_count: frozenCupsToTins(dayShift.totalTransitCount),
        night_shift_count: frozenCupsToTins(nightShift.totalTransitCount),
      };
    });

    this.frozenDataExists = this.frozenTransits.length !== 0;
    const totalCount = this.frozenTransits.reduce((acc, report) => {
      return acc + report.frozenCups;
    }, 0);
    this.frozenTotalCountText = frozenCupsToTins(totalCount);
  }

  getInchargeNames(item: Transit[], item2: Transit[]): string {
    return [...item, ...item2]
      .map((transit) => transit.staffInCharge || '')
      .filter((name, index, self) => name && self.indexOf(name) === index)
      .join(', ');
  }

  getUnitName(item: StockInputUnit): string {
    const { name, brand, spec } = item;
    return `${name} ${brand ? `- ${brand}` : ''} ${spec ? ` (${spec})` : ''}`.trim();
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
