import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { WORKSHEET_TABLE_STATUS } from '@app/shared/constants/shared.contants';
import { WorksheetTank } from '@app/worksheet/models/active-worksheet';
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
  worksheetDetails: WorksheetTank | null = null;

  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['type']) {
        this.status =
          params['type'] === 'U' ? WORKSHEET_TABLE_STATUS.IN_USE : WORKSHEET_TABLE_STATUS.ACTIVE;
      }
    });

    const worksheet = localStorage.getItem('restock-worksheet-id');
    if (worksheet) {
      this.worksheetDetails = JSON.parse(worksheet);
    }

    this.worksheetFacadeService.getActiveRestocks(this.status);
    this.worksheetFacadeService.activeRestocks$
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((data) => {
        if (this.worksheetDetails) {
          this.dataSource.data = data.filter(
            (item) => item.worksheetId === this.worksheetDetails?.worksheetId,
          );
        } else {
          this.dataSource.data = data;
        }
      });
  }
  // Add this method to filter dataSource based on searchText
  applyFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const filterValue = inputValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: ActiveRestock, filter: string) => {
      // Helper to recursively search all values, including nested objects
      const search = (obj: any): boolean => {
        return Object.values(obj).some((val) => {
          if (val && typeof val === 'object') {
            return search(val);
          }
          return val && val.toString().toLowerCase().includes(filter);
        });
      };
      return search(data);
    };
    this.dataSource.filter = filterValue;
    // this.dataSource.paginator = this.paginator;
  }

  clearFilter() {
    localStorage.removeItem('restock-worksheet-id');
    this.searchText = '';
    this.dataSource.filter = '';

    this.worksheetDetails = null;
    this.worksheetFacadeService.getActiveRestocks(this.status);
  }

  toggleChange(event: MatButtonToggleChange) {
    this.status = event.value;
    this.worksheetFacadeService.getActiveRestocks(event.value);
  }

  onClickBack() {
    this.router.navigate(['/worksheet']);
  }

  ngOnDestroy() {
    localStorage.removeItem('restock-worksheet-id');
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
