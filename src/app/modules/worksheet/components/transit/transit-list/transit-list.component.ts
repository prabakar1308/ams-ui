import { Component } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import {
  WORKSHEET_OUTPUT_UNITS,
  WORKSHEET_TABLE_STATUS,
} from '@app/shared/constants/shared.contants';
import { UnitSector, WorksheetUnit } from '@app/shared/models/master';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Transit } from '@app/worksheet/models/transit';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { TransitEditDialogComponent } from '../transit-edit-dialog/transit-edit-dialog.component';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';
import { ADMIN, SUPER_ADMIN } from '@app/core/core.contants';

@Component({
  selector: 'app-transit-list',
  standalone: false,
  templateUrl: './transit-list.component.html',
  styleUrl: './transit-list.component.scss',
})
export class TransitListComponent {
  private unSubscribe = new Subject<void>();
  displayedColumns = [
    'unitSector',
    'staffInCharge',
    'createdAt',
    'createdBy',
    'transitCount',
    'action',
  ];
  dataSource = new MatTableDataSource<Transit>();
  statusDetails = WORKSHEET_TABLE_STATUS;
  status = WORKSHEET_TABLE_STATUS.ACTIVE;
  transits: Transit[] = [];
  unitSectors: UnitSector[] = [];
  worksheetUnits: WorksheetUnit[] = [];
  selectedValue = 0;
  selectedUnit: number | null = 0;
  selectedUnitSector: number | null = 0;
  periods = [
    {
      label: 'Today',
      value: 0,
    },
    {
      label: 'Yesterday',
      value: 1,
    },
    {
      label: 'Last 3 days',
      value: 2,
    },
    {
      label: 'Last 7 days',
      value: 6,
    },
    {
      label: 'Last 30 days',
      value: 29,
    },
  ];
  isAdmin = false;
  currentUserId: number = 0;

  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private authFacadeService: AuthFacadeService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.worksheetFacadeService.getTransits({ days: 0 });
    this.worksheetFacadeService.transits$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.transits = data;
      this.onUnitChange(this.selectedUnit || 0);
    });

    this.sharedFacadeService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.unitSectors = [{ id: 0, name: 'All', description: '' }, ...data.unitSectors];
        this.worksheetUnits = [
          { id: 0, value: 'All', brand: '' },
          ...data?.worksheetUnits.filter((unit) => WORKSHEET_OUTPUT_UNITS.includes(unit.id)),
        ];
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

  canAccessAction(data: Transit): boolean {
    return this.isAdmin || data.createdById === this.currentUserId;
  }

  toggleChange(event: MatButtonToggleChange) {
    this.status = event.value;
    this.worksheetFacadeService.getActiveRestocks(event.value);
  }

  periodChange(event: number) {
    this.worksheetFacadeService.getTransits({ days: event });
  }

  onUnitChange(unitId: number) {
    this.updateTableData(unitId, this.selectedUnitSector || 0);
  }

  onUnitSectorChange(unitSectorId: number) {
    this.updateTableData(this.selectedUnit || 0, unitSectorId);
  }

  updateTableData(unitId: number, unitSectorId: number) {
    if (unitId === 0 && unitSectorId === 0) {
      this.dataSource.data = this.transits;
    } else if (unitId === 0) {
      this.dataSource.data = this.transits.filter(
        (transit) => transit.unitSector.id === unitSectorId,
      );
    } else if (unitSectorId === 0) {
      this.dataSource.data = this.transits.filter((transit) => transit.unitId === unitId);
    } else {
      this.dataSource.data = this.transits.filter(
        (transit) => transit.unitId === unitId && transit.unitSector.id === unitSectorId,
      );
    }
  }

  onClickBack() {
    this.router.navigate(['/worksheet']);
  }

  onDelete(element: Transit) {
    const data = {
      title: 'Delete Confirmation',
      message: `Are you sure you want to delete the transit?`,
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });
    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        const { count, id, countInStock, harvestId } = element;
        const payload = {
          count: count || 0,
          id,
          // add count to stock when it is deleted
          countInStock: countInStock ? countInStock + (count || 0) : 0,
          harvestId,
          isDelete: true,
        };
        this.worksheetFacadeService.updateTransit({ payload, days: this.selectedValue });
      }
    });
  }

  openDialog(element: Transit) {
    const data = {
      transit: element,
      unitSectors: this.unitSectors.filter((us) => us.id !== 0),
    };
    const dialogRef = this.dialog.open(TransitEditDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((payload) => {
      if (payload) {
        this.worksheetFacadeService.updateTransit({ payload, days: this.selectedValue });
      }
    });
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
