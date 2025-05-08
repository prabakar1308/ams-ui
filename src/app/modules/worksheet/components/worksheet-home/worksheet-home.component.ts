import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { WorksheetTank } from '@app/worksheet/models/active-worksheet';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { WORKSHEET_STATUS, WORKSHEET_UPDATE_ACTION } from '@app/shared/constants/shared.contants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { WorksheetUpdateDialogComponent } from '../worksheet-update-dialog/worksheet-update-dialog.component';
import { Router } from '@angular/router';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { WorksheetFilter } from '@app/shared/models/shared-state';

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
  disableCreate = true;

  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private sharedFacadeService: SharedFacadeService,
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

  canDelete(data: WorksheetTank): boolean {
    return data && data.status?.id === WORKSHEET_STATUS.READY_FOR_STOCKING;
  }

  getIconName(data: WorksheetTank) {
    const status = data && data.status ? data.status.id : WORKSHEET_STATUS.FREE;
    switch (status) {
      case WORKSHEET_STATUS.READY_FOR_STOCKING:
        return 'keyboard_double_arrow_right';
      case WORKSHEET_STATUS.READY_FOR_HARVEST:
        return 'task_alt';
      case WORKSHEET_STATUS.FREE:
        return 'add_circle';
      default:
        return '';
    }
  }

  getTooltipValue(data: WorksheetTank) {
    const status = data && data.status ? data.status.id : WORKSHEET_STATUS.FREE;
    switch (status) {
      case WORKSHEET_STATUS.READY_FOR_STOCKING:
        return 'Update';
      case WORKSHEET_STATUS.READY_FOR_HARVEST:
        return 'Harvest';
      case WORKSHEET_STATUS.FREE:
        return 'Create';
      default:
        return '';
    }
  }

  onAction(worksheet: WorksheetTank, action: string) {
    if (action === 'delete') {
      const data = {
        title: 'Delete Confirmation',
        message: `Are you sure you want to delete the worksheet?`,
      };
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });
      dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          // this.deleteAccountType(accountType.value.accountTypeId);
        }
      });
    } else if (action === 'next') {
      const status = worksheet && worksheet.status ? worksheet.status.id : WORKSHEET_STATUS.FREE;
      switch (status) {
        case WORKSHEET_STATUS.READY_FOR_STOCKING:
          const data: any = {
            title: `Tank ${worksheet.tankNumber}`,
            worksheet,
          };
          const dialogRef = this.dialog.open(WorksheetUpdateDialogComponent, { data });
          dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
            if (isConfirmed) {
              this.worksheetFacadeService.updateWorksheets({
                worksheets: [
                  {
                    id: worksheet.worksheetId,
                    statusId: WORKSHEET_STATUS.IN_STOCKING,
                  },
                ],
                updateAction: WORKSHEET_UPDATE_ACTION.STATUS,
              });
            }
          });
          break;
        case WORKSHEET_STATUS.READY_FOR_HARVEST:
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
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
