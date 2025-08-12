import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { WorksheetTank } from '@app/worksheet/models/active-worksheet';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import {
  HARVEST_TYPES,
  WORKSHEET_STATUS,
  WORKSHEET_UPDATE_ACTION,
} from '@app/shared/constants/shared.contants';
import { WorksheetUpdateDialogComponent } from '../worksheet-update-dialog/worksheet-update-dialog.component';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { WorksheetFilter } from '@app/shared/models/shared-state';
import { UpdateWorksheetRequest } from '@app/worksheet/models/create-worksheet';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';
import { ADMIN, SUPER_ADMIN } from '@app/core/core.contants';

@Component({
  selector: 'app-worksheet-home',
  standalone: false,
  templateUrl: './worksheet-home.component.html',
  styleUrl: './worksheet-home.component.scss',
})
export class WorksheetHomeComponent implements OnInit, OnDestroy {
  private unSubscribe = new Subject<void>();
  activeWorksheets: WorksheetTank[] = [];
  displayedColumns = ['select', 'tank', 'harvest', 'source', 'user', 'status', 'action'];
  dataSource = new MatTableDataSource<WorksheetTank>();
  selection = new SelectionModel<WorksheetTank>(true, []);
  worksheetFilter: WorksheetFilter = {};
  worksheetStatus = WORKSHEET_STATUS;
  disableCreate = true;
  isAdmin = false;

  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private authFacadeService: AuthFacadeService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {
    // subscriptions
    this.worksheetFacadeService.activeWorksheets$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.selection.clear();
        this.disableCreate = true;
        this.activeWorksheets = data;
        this.dataSource.data = data;
      });

    this.sharedFacadeService.worksheetFilter$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.worksheetFilter = data;
      });

    this.authFacadeService.userData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((userData) => {
        if (userData) {
          this.isAdmin = userData.userRole === ADMIN || userData.userRole === SUPER_ADMIN;
        }
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.filter((data) => !data.worksheetId).length;
    return numSelected === numRows;
  }

  get disableHeader() {
    const numRows = this.dataSource.data.filter((data) => !data.worksheetId).length;
    return numRows === 0;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.disableCreate = true;
      return;
    }

    this.selection.select(...this.dataSource.data.filter((data) => !data.worksheetId));
    this.disableCreate = false;
  }

  toggleRow(element: WorksheetTank) {
    this.selection.toggle(element);
    this.disableCreate = !this.selection.selected.length;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  navigateToRestock(data: WorksheetTank) {
    if (data && data.worksheetId) {
      localStorage.setItem('restock-worksheet-id', JSON.stringify(data));
      this.router.navigate(['worksheet/restock']);
    }
  }

  canDelete(data: WorksheetTank): boolean {
    return data && data.status?.id === WORKSHEET_STATUS.READY_FOR_STOCKING;
  }

  isRestockType(data: WorksheetTank): boolean {
    return data && data.harvestType?.id === HARVEST_TYPES.RESTOCKING;
  }

  getIconName(data: WorksheetTank) {
    const status = data && data.status ? data.status.id : WORKSHEET_STATUS.FREE;
    switch (status) {
      case WORKSHEET_STATUS.READY_FOR_STOCKING:
        return 'keyboard_double_arrow_right';
      case WORKSHEET_STATUS.READY_FOR_HARVEST:
        return 'task_alt';
      case WORKSHEET_STATUS.FREE:
        return this.isAdmin ? 'add_circle' : '';
      default:
        return '';
    }
  }

  getTooltipValue(data: WorksheetTank) {
    const status = data && data.status ? data.status.id : WORKSHEET_STATUS.FREE;
    switch (status) {
      case WORKSHEET_STATUS.READY_FOR_STOCKING:
        return 'Move';
      case WORKSHEET_STATUS.READY_FOR_HARVEST:
        return 'Harvest';
      case WORKSHEET_STATUS.FREE:
        return 'Create';
      default:
        return '';
    }
  }

  onAction(worksheet: WorksheetTank, action: string, userOnly: boolean = false) {
    if (action === 'edit') {
      // this.deleteAccountType(accountType.value.accountTypeId);
      this.worksheetFacadeService.updateWorksheetTankSelection({
        tankType: this.worksheetFilter.tankTypeId,
        tanks: [worksheet.tankNumber],
      });
      this.router.navigate(['worksheet/create'], {
        queryParams: { id: worksheet.worksheetId },
      });
    } else if (action === 'next') {
      const status = worksheet && worksheet.status ? worksheet.status.id : WORKSHEET_STATUS.FREE;
      switch (status) {
        case WORKSHEET_STATUS.READY_FOR_STOCKING:
          this.openWorksheetUpdateDialog(worksheet, userOnly);
          break;
        case WORKSHEET_STATUS.READY_FOR_HARVEST:
          localStorage.setItem('worksheet', JSON.stringify(worksheet));
          this.router.navigate(['worksheet/harvest/create']);
          break;
        case WORKSHEET_STATUS.FREE:
          this.worksheetFacadeService.updateWorksheetTankSelection({
            tankType: this.worksheetFilter.tankTypeId,
            tanks: [worksheet.tankNumber],
          });
          this.router.navigate(['worksheet/create']);
          break;
        default:
          break;
      }
    } else if (action === 'update') {
      this.openWorksheetUpdateDialog(worksheet, userOnly);
    }
  }

  openWorksheetUpdateDialog(worksheet: WorksheetTank, userOnly: boolean) {
    const data: any = {
      title: `Tank ${worksheet.tankNumber}`,
      worksheet,
      userOnly,
    };
    const dialogRef = this.dialog.open(WorksheetUpdateDialogComponent, { data });
    dialogRef.afterClosed().subscribe((result: { userId?: number; generatedAt?: Date }) => {
      if (result) {
        let updatedData: UpdateWorksheetRequest = {
          worksheets: [
            {
              id: worksheet.worksheetId,
              statusId: WORKSHEET_STATUS.IN_STOCKING,
              generatedAt: result.generatedAt,
            },
            {
              id: worksheet.worksheetId,
              userId: result.userId as number,
              generatedAt: result.generatedAt,
            },
          ],
          updateAction: WORKSHEET_UPDATE_ACTION.ASSIGNEE_STATUS,
          worksheetFilter: this.worksheetFilter,
        };
        if (userOnly) {
          updatedData = {
            worksheets: [
              {
                id: worksheet.worksheetId,
                userId: result as number,
              },
            ],
            updateAction: WORKSHEET_UPDATE_ACTION.ASSIGNEE,
            worksheetFilter: this.worksheetFilter,
          };
        }
        this.worksheetFacadeService.updateWorksheets(updatedData);
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
