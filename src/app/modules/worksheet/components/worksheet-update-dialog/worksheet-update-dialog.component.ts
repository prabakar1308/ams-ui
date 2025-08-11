import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Subject, takeUntil } from 'rxjs';

import { UserDetails } from '@app/shared/models/user-details';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-worksheet-update-dialog',
  standalone: false,
  templateUrl: './worksheet-update-dialog.component.html',
  styleUrl: './worksheet-update-dialog.component.scss',
})
export class WorksheetUpdateDialogComponent implements OnInit, OnDestroy {
  selection = new SelectionModel<any>(true, []);
  selectAllCheck = false;
  selectedUserId: number | null = null;
  form: FormGroup;
  userDetails: UserDetails[] | null = null;
  private unSubscribe = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<WorksheetUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedFacade: SharedFacadeService,
  ) {
    this.form = new FormGroup({
      generatedAt: new FormControl(this.data.worksheet.generatedAt),
    });
  }

  ngOnInit() {
    this.selectedUserId = this.data.worksheet ? this.data.worksheet.assignedUser?.id || 0 : 0;

    this.sharedFacade.userData$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.userDetails = [...data];
    });
  }

  onUserChange(event: number) {
    this.selectedUserId = event;
  }

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
    return (
      this.selection.selected.length !== this.data.worksheet.parameters.length &&
      !this.data.userOnly
    );
  }

  update(): void {
    this.dialogRef.close({
      userId: this.selectedUserId,
      generatedAt: this.form.get('generatedAt')?.value,
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
