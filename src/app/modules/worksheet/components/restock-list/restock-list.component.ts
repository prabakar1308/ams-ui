import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WORKSHEET_TABLE_STATUS } from '@app/shared/constants/shared.contants';
import { ActiveRestock } from '@app/worksheet/models/restock';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-restock-list',
  standalone: false,
  templateUrl: './restock-list.component.html',
  styleUrl: './restock-list.component.scss',
})
export class RestockListComponent implements OnInit, OnDestroy {
  private unSubscribe = new Subject<void>();
  displayedColumns = [
    'tank',
    'harvest',
    'source',
    'createdAt',
    'createdBy',
    'harvestCount',
    'count',
  ];
  dataSource = new MatTableDataSource<ActiveRestock>();
  statusDetails = WORKSHEET_TABLE_STATUS;
  status = WORKSHEET_TABLE_STATUS.ACTIVE;
  searchText = '';

  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.worksheetFacadeService.getActiveRestocks(this.status);
    this.worksheetFacadeService.activeRestocks$
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  toggleChange(event: MatButtonToggleChange) {
    this.status = event.value;
    this.worksheetFacadeService.getActiveRestocks(event.value);
  }

  onClickBack() {
    this.router.navigate(['/worksheet']);
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
