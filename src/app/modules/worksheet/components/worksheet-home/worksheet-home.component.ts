import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { WorksheetTank } from '@app/worksheet/models/active-worksheet';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { WORKSHEET_STATUS } from '@app/shared/constants/shared.contants';

@Component({
  selector: 'app-worksheet-home',
  standalone: false,
  templateUrl: './worksheet-home.component.html',
  styleUrl: './worksheet-home.component.scss',
})
export class WorksheetHomeComponent {
  private unSubscribe = new Subject<void>();
  activeWorksheets: WorksheetTank[] = [];
  displayedColumns = ['select', 'tank', 'harvest', 'source', 'user', 'status', 'action'];
  dataSource = new MatTableDataSource<WorksheetTank>();
  selection = new SelectionModel<any>(true, []);

  constructor(private worksheetFacadeService: WorksheetFacadeService) {}

  ngOnInit() {
    // subscriptions
    this.worksheetFacadeService.activeWorksheets$
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((data) => {
        this.activeWorksheets = data;
        this.dataSource.data = data;
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
      return;
    }

    this.selection.select(...this.dataSource.data.filter((data) => !data.worksheetId));
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

  onAction(data: any, action: string) {
    console.log(data, action);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
