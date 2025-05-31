import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SEVERITY } from '@app/core/core.contants';
import { NotificationService } from '@app/core/services/notification.service';
import { UserDetails } from '@app/shared/models/user-details';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { TransitDetail } from '@app/worksheet/models/create-transit';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-harvest-list-popup',
  standalone: false,
  templateUrl: './harvest-list-popup.component.html',
  styleUrl: './harvest-list-popup.component.scss',
})
export class HarvestListPopupComponent {
  private unSubscribe = new Subject<void>();
  countsRemining: number = 0;
  transitCount: number = 0;
  transitDetails: TransitDetail[] = [];
  selectedSectorId: number = 0;
  showError: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private wfService: WorksheetFacadeService,
    private nsService: NotificationService,
    public dialogRef: MatDialogRef<HarvestListPopupComponent>,
  ) {
    this.countsRemining = this.data.harvestData.countInStock;
    this.addTransit();
  }

  addTransit() {
    let transit: TransitDetail = {
      count: 0,
      harvestId: this.data.harvestData.id,
      staffInCharge: '',
      unitId: this.data.harvestData.unit.id,
      unitSectorId: 0,
    };
    this.transitDetails.push(transit);
  }

  onChangeUser(event: number) {
    //user changed action
  }

  calculateCount() {
    let totalCount = 0;
    this.transitDetails.forEach((x) => {
      totalCount = totalCount + parseInt(x.count.toString());
    });
    this.countsRemining = this.data.harvestData.countInStock - totalCount;
  }

  saveTransit() {
    // Validate transit details before saving
    const isValid = this.transitDetails.every(
      (x) => x.count > 0 && x.staffInCharge && x.unitId && x.harvestId,
    );
    if (!isValid) {
      this.showError = true;
      this.nsService.showMessage(
        SEVERITY.ERROR,
        'Please fill all required transit details before saving.',
      );
      return;
    }

    this.wfService.createTransit({
      transits: this.transitDetails,
      harvestId: this.data.harvestData.id,
    });

    this.dialogRef.close();
  }
}
