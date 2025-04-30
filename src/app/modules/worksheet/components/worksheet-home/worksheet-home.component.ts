import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActiveWorksheet } from '@modules/worksheet/models/active-worksheet';
import { WorksheetFacadeService } from '@modules/worksheet/services/worksheet-facade.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-worksheet-home',
  standalone: false,
  templateUrl: './worksheet-home.component.html',
  styleUrl: './worksheet-home.component.scss',
})
export class WorksheetHomeComponent {
  private unSubscribe = new Subject<void>();
  activeWorksheets: ActiveWorksheet[] = [];

  displayedColumns = ['select', 'tank', 'harvest', 'source', 'user', 'status', 'action'];

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  constructor(private worksheetFacadeService: WorksheetFacadeService) {}

  ngOnInit() {
    this.loadAllData();

    // subscriptions
    this.worksheetFacadeService.activeWorksheets$
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((data) => {
        this.activeWorksheets = data;
        this.dataSource.data = data;
      });
  }

  loadAllData() {
    this.worksheetFacadeService.getActiveWorksheets(0, 0, 0);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.filter((data) => !data.worksheet).length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data.filter((data) => !data.worksheet));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onStatusChange(event: any) {
    console.log('Selected status:', event);
    this.worksheetFacadeService.getActiveWorksheets(0, 0, event);
  }

  onUserChange(event: any) {
    console.log('Selected user:', event);
    this.worksheetFacadeService.getActiveWorksheets(event, 0, 0);
  }

  onTankTypeChange(event: string) {
    this.loadAllData();
    if (event !== 'All') {
      this.activeWorksheets =
        this.activeWorksheets?.filter((x) => x.worksheet?.tankType?.value === event) == null
          ? []
          : this.activeWorksheets?.filter((x) => x.worksheet?.tankType?.value === event);
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
