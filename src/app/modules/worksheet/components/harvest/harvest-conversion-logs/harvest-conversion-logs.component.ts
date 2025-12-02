import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HarvestConversionLog } from '@app/worksheet/models/harvest-conversion-logs';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-harvest-conversion-logs',
  standalone: false,
  templateUrl: './harvest-conversion-logs.component.html',
  styleUrl: './harvest-conversion-logs.component.scss',
  providers: [DatePipe],
})
export class HarvestConversionLogsComponent implements OnInit, OnDestroy {
  private unSubscribe = new Subject<void>();
  displayColumns: string[] = ['created_date', 'removed_count', 'added_count'];

  tableData: HarvestConversionLog[] = [];
  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.worksheetFacadeService.getHarvestConversionLogs();
    this.worksheetFacadeService.harvestConversionLogs$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((logs) => {
        this.tableData = logs.map((log) => ({
          ...log,
          removed_count: `${log.millions} Millions`,
          added_count: `${log.frozenCups} Frozen Cups`,
          created_date: this.datePipe.transform(log.createdAt, 'MMM d, y h:mm a'),
        }));
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
