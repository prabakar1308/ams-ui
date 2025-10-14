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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';
import { ADMIN, SUPER_ADMIN } from '@app/core/core.contants';
import { UNIT_IDS } from '@app/shared/constants/shared.contants';
import { MonitoringCount } from '@app/worksheet/models/monitoring-count';
import { APP_DEFAULT_PAGE_SIZE, APP_DEFAULT_PAGE_SIZE_OPTIONS } from 'app/app.constants';

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
    // 'count_remaining',
    'action',
  ];
  totalRecords: number = 0;
  pageSizeOptions: number[] = APP_DEFAULT_PAGE_SIZE_OPTIONS;
  pageSize = APP_DEFAULT_PAGE_SIZE;
  userDetails: UserDetails[] = [];
  unitSectors: UnitSector[] = [];
  isAdmin = false;
  currentUserId: number = 0;
  unitName: string = '';
  monitoringCount: MonitoringCount | null = null;

  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private authFacadeService: AuthFacadeService,
    private dialog: MatDialog,
    private router: Router,
  ) {}
  ngOnInit() {
    this.worksheetFacadeService.getMonitoringCount();
    this.worksheetFacadeService.activeHarvestData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((harvest) => {
        const today = new Date();
        this.dataSource.data = harvest.data.map((harvest) => ({
          ...harvest,
          isCurrentShift: harvest.generatedAt
            ? this.isCurrentShift(new Date(harvest.generatedAt))
            : false,
          isPreviousShift: harvest.generatedAt
            ? this.isPreviousShift(new Date(harvest.generatedAt))
            : false,
          // isCurrentDate: harvest.generatedAt
          //   ? this.isSameDate(new Date(harvest.generatedAt), today)
          //   : false,
        }));
        this.totalRecords = harvest.totalRecords;
        // this.totalHarvestCount = data.reduce((acc, item) => acc + (item.count || 0), 0);
        this.dataSource.paginator = this.paginator;
      });
    this.worksheetFacadeService.monitoringCount$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.monitoringCount = data;
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

    this.authFacadeService.userData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((userData) => {
        if (userData) {
          this.isAdmin = userData.userRole === ADMIN || userData.userRole === SUPER_ADMIN;
          this.currentUserId = parseInt(userData.userId);
        }
      });
  }

  ngOnChanges() {
    this.applyFilter();
    this.unitName = this.unitId === UNIT_IDS.MILLIONS ? 'Millions' : 'Frozen Cups';
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

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isCurrentShift(harvestDate: Date): boolean {
    const now = new Date();
    const isSameDay = this.isSameDate(harvestDate, now); // Compare only the date part
    const currentHour = now.getHours();
    const harvestHour = harvestDate.getHours();

    if (currentHour >= 6 && currentHour < 18 && isSameDay) {
      return harvestHour >= 6 && harvestHour < 18;
    } else if (
      (isSameDay && harvestHour >= 18 && harvestHour < 24) ||
      (this.isSameDate(harvestDate, new Date(now.setDate(now.getDate() - 1))) &&
        harvestHour > 0 &&
        harvestHour < 6) // Check for the previous day
    ) {
      return true;
    }
    return false;
  }

  isPreviousShift(harvestDate: Date): boolean {
    const now = new Date();
    const isSameDay = this.isSameDate(harvestDate, now); // Compare only the date part
    const currentHour = now.getHours();
    const harvestHour = harvestDate.getHours();

    if (
      currentHour >= 6 &&
      currentHour < 18 &&
      (isSameDay || this.isSameDate(harvestDate, new Date(now.setDate(now.getDate() - 1))))
    ) {
      return harvestHour >= 18 || harvestHour < 6;
    } else if (isSameDay) {
      return harvestHour >= 6 && harvestHour < 18;
    }
    return false;
  }

  get totalHarvestCount(): number {
    return this.unitId === UNIT_IDS.MILLIONS
      ? this.monitoringCount?.millionsHarvested || 0
      : this.monitoringCount?.frozenCupsHarvested || 0;
  }

  get availableCount(): number {
    if (!this.monitoringCount) return 0;
    return this.unitId === UNIT_IDS.MILLIONS
      ? this.monitoringCount.millionsHarvested - this.monitoringCount.millionsTransited
      : this.monitoringCount.frozenCupsHarvested - this.monitoringCount.frozenCupsTransited;
  }

  onPageChange(event: PageEvent) {
    const { pageIndex, pageSize } = event;
    let filter: HarvestFilter = {
      unitId: this.unitId || 1, // Default to 1 if unitId is not provided
      statusIds: ['A', 'P'],
      page: pageIndex + 1, // MatPaginator pages are zero-based
      limit: pageSize,
    };
    this.worksheetFacadeService.getHarvests(filter);
  }

  canAccessAction(data: HarvestDetails): boolean {
    return (this.isAdmin || data.measuredBy?.id === this.currentUserId) && !data.transferStatus;
  }

  openDialog() {
    // this.worksheetService.getTransitsByHarvestId(element.id).subscribe((res) => {
    //   if (res.status === 200) {
    // let count = 0;
    // let countInStock = 0;
    // console.log('Monitoring Count:', this.monitoringCount);
    // if (this.monitoringCount) {
    //   const { millionsHarvested, frozenCupsHarvested, millionsTransited, frozenCupsTransited } =
    //     this.monitoringCount;
    //   if (this.unitId === UNIT_IDS.MILLIONS) {
    //     count = millionsHarvested || 0;
    //     countInStock = count - (millionsTransited || 0);
    //   }
    //   if (this.unitId === UNIT_IDS.FROZEN_CUPS) {
    //     count = frozenCupsHarvested || 0;
    //     countInStock = count - (frozenCupsTransited || 0);
    //   }
    // }
    const data = {
      // harvestData: element,
      countInStock: this.availableCount,
      count: this.totalHarvestCount,
      unit: { id: this.unitId, value: this.unitName },
      // unit: element.unit,
      // Need to pass only selected unit sectors based on unit
      // unitSectors: this.unitSectors.filter((sector) => sector.unitId === element.unit.id),
      userDetails: this.userDetails,
      unitSectors: this.unitSectors,
      // exisingTransits: res.data,
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
    // }
    // });
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
