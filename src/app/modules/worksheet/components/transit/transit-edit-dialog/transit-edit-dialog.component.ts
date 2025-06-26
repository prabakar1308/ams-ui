import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SEVERITY } from '@app/core/core.contants';
import { NotificationService } from '@app/core/services/notification.service';
import { UnitSector } from '@app/shared/models/master';
import { TransitDetail } from '@app/worksheet/models/create-transit';
import { Transit, TransitUpdate } from '@app/worksheet/models/transit';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';

@Component({
  selector: 'app-transit-edit-dialog',
  standalone: false,
  templateUrl: './transit-edit-dialog.component.html',
  styleUrl: './transit-edit-dialog.component.scss',
})
export class TransitEditDialogComponent {
  countsRemaining: number = 0;
  overallCountInStock: number = 0;
  transitDetails!: TransitUpdate;
  selectedSectorId: number = 0;
  showError: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { transit: Transit; unitSectors: UnitSector[] },
    private nsService: NotificationService,
    public dialogRef: MatDialogRef<TransitEditDialogComponent>,
  ) {
    this.overallCountInStock =
      (this.data.transit.countInStock || 0) + (this.data.transit.count || 0);
    this.countsRemaining = this.data.transit.countInStock || 0;
    this.updateTransit();
  }

  updateTransit() {
    this.transitDetails = {
      count: this.data.transit.count || 0,
      id: this.data.transit.id,
      staffInCharge: this.data.transit.staffInCharge || '',
      unitSectorId: this.data.transit.unitSector.id,
      harvestId: this.data.transit.harvestId || 0,
    };
  }

  calculateCount() {
    this.countsRemaining = this.overallCountInStock - this.transitDetails.count;
  }

  saveTransit() {
    // Validate transit details before saving

    const { unitSectorId, staffInCharge, count } = this.transitDetails;
    const isValid = unitSectorId && staffInCharge && count > 0;
    if (!isValid) {
      this.showError = true;
      this.nsService.showMessage(
        SEVERITY.ERROR,
        'Please fill all required transit details before saving.',
      );
      return;
    }

    this.dialogRef.close({ ...this.transitDetails, countInStock: this.countsRemaining });
  }
}
