import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-worksheet-update-dialog',
  standalone: false,
  templateUrl: './worksheet-update-dialog.component.html',
  styleUrl: './worksheet-update-dialog.component.scss',
})
export class WorksheetUpdateDialogComponent {
  selection = new SelectionModel<any>(true, []);
  selectAllCheck = false;
  constructor(
    public dialogRef: MatDialogRef<WorksheetUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  selectAll(event: MatCheckboxChange) {
    this.selectAllCheck = event.checked;
    if (event.checked) this.selection.select(...this.data.worksheet.parameters);
    else this.selection.clear();
  }

  onChange(event: MatSelectionListChange): void {
    this.selection.clear();
    if (event.source._value?.length) this.selection.select(...event.source._value);

    this.selectAllCheck = !this.disableUpdate;
  }

  get disableUpdate() {
    return this.selection.selected.length !== this.data.worksheet.parameters.length;
  }
}
