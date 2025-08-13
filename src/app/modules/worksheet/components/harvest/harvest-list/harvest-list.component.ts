import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '@app/shared/models/user-details';
import { HarvestDetails } from '@app/worksheet/models/harvest-details';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { HarvestListPopupComponent } from '../harvest-list-popup/harvest-list-popup.component';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { UnitSector } from '@app/shared/models/master';
import { HarvestFilter } from '@app/shared/models/shared-state';
import { Router } from '@angular/router';
import { WorksheetService } from '@app/worksheet/services/worksheet.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-harvest-list',
  standalone: false,
  templateUrl: './harvest-list.component.html',
  styleUrl: './harvest-list.component.scss',
})
export class HarvestListComponent {
  // Add input parameter
  @Input() unitId!: number;
  @Input() searchText: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private unSubscribe = new Subject<void>();
  dataSource = new MatTableDataSource<HarvestDetails>();
  displayedColumns = [
    'tank',
    'harvest',
    'createdDate',
    'measured_by',
    'count_measured',
    'count_remaining',
    'action',
  ];
  userDetails: UserDetails[] = [];
  unitSectors: UnitSector[] = [];

  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private worksheetService: WorksheetService,
    private sharedFacadeService: SharedFacadeService,
    private dialog: MatDialog,
    private router: Router,
  ) {}
  ngOnInit() {
    this.worksheetFacadeService.activeHarvestList$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    //masterData$
    this.sharedFacadeService.userData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.userDetails = data;
      });
    this.sharedFacadeService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.unitSectors = data.unitSectors;
      });
  }

  // Add this method to filter dataSource based on searchText
  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: HarvestDetails, filter: string) => {
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
    this.dataSource.paginator = this.paginator;
  }

  // Call applyFilter() whenever searchText changes (e.g., from an input)
  ngOnChanges() {
    this.applyFilter();
  }

  onPageChange(event: PageEvent) {
    console.log(event);
  }

  openDialog(element: HarvestDetails) {
    this.worksheetService.getTransitsByHarvestId(element.id).subscribe((res) => {
      if (res.status === 200) {
        const data = {
          harvestData: element,
          userDetails: this.userDetails,
          unitSectors: this.unitSectors,
          exisingTransits: res.data,
        };
        const dialogRef = this.dialog.open(HarvestListPopupComponent, { data });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            let filter: HarvestFilter = {
              unitId: this.unitId || 1, // Default to 1 if unitId is not provided
              statusIds: ['A', 'P'],
            };
            this.worksheetFacadeService.createTransit({ ...result, filter });
          }
        });
      }
    });
  }

  onEdit(element: HarvestDetails) {
    // localStorage.setItem('harvest', JSON.stringify(element));
    this.router.navigate(['worksheet/harvest/create'], {
      queryParams: { id: element.id },
    });
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
