import { Component, Input } from '@angular/core';
import { TransitTable } from '../../models/report';
import { TransitReport } from '../../models/transit-response';
import { frozenCupsToTins, millionsToTins } from '../../utils';

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
  displayColumns = ['unit_sector', 'day_shift_count', 'night_shift_count', 'total_count'];
  liveTableData: TransitTable[] = [];
  frozenTableData: TransitTable[] = [];
  liveDataExists = true;
  liveTotalCountText = '';
  frozenDataExists = true;
  frozenTotalCountText = '';

  ngOnInit() {
    this.generateLiveTableData();
    this.generateFrozenTableData();
  }

  ngOnChanges(): void {
    this.generateLiveTableData();
    this.generateFrozenTableData();
  }

  generateLiveTableData() {
    this.liveTableData = this.liveTransits.map((transit) => {
      const { dayShift, nightShift } = transit.shifts;
      return {
        unit_sector: transit.unitSector.name,
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
      return {
        unit_sector: transit.unitSector.name,
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
}
