import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-worksheet-update-dialog',
  standalone: false,
  templateUrl: './worksheet-update-dialog.component.html',
  styleUrl: './worksheet-update-dialog.component.scss',
})
export class WorksheetUpdateDialogComponent {
  selection = new SelectionModel<any>(true, []);
  constructor(
    public dialogRef: MatDialogRef<WorksheetUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  selectAll(event: MatCheckboxChange) {
    if (event.checked) this.selection.select(...this.data.worksheet.parameters);
    else this.selection.clear();
  }
}
