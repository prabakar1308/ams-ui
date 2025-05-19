import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WORKSHEET_TABLE_STATUS } from '@app/shared/constants/shared.contants';
import { Transit } from '@app/worksheet/models/transit';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-transit-list',
  standalone: false,
  templateUrl: './transit-list.component.html',
  styleUrl: './transit-list.component.scss',
})
export class TransitListComponent {
  private unSubscribe = new Subject<void>();
  displayedColumns = ['unitSector', 'createdAt', 'createdBy', 'transitCount'];
  dataSource = new MatTableDataSource<Transit>();
  statusDetails = WORKSHEET_TABLE_STATUS;
  status = WORKSHEET_TABLE_STATUS.ACTIVE;

  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.worksheetFacadeService.getTransits({ days: 0 });
    this.worksheetFacadeService.transits$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
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
