import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SEVERITY } from '@app/core/core.contants';
import { NotificationService } from '@app/core/services/notification.service';
import { UnitSector } from '@app/shared/models/master';
import { TransitDetail } from '@app/worksheet/models/create-transit';
import { Transit } from '@app/worksheet/models/transit';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';

@Component({
  selector: 'app-harvest-list-popup',
  standalone: false,
  templateUrl: './harvest-list-popup.component.html',
  styleUrl: './harvest-list-popup.component.scss',
})
export class HarvestListPopupComponent {
  countsRemining: number = 0;
  transitCount: number = 0;
  transitDetails: TransitDetail[] = [];
  selectedUnitSectors: UnitSector[] = [];
  allUnitSectors: any[] = [];
  exisingTransits: Transit[] = [];
  selectedSectorId: number = 0;
  showError: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private wfService: WorksheetFacadeService,
    private nsService: NotificationService,
    public dialogRef: MatDialogRef<HarvestListPopupComponent>,
  ) {
    this.countsRemining = this.data.harvestData.countInStock;
    this.allUnitSectors = this.data.unitSectors.map((sector: any) => ({
      ...sector,
      isSelected: false,
    }));
    this.exisingTransits = this.data.exisingTransits;
    this.selectedUnitSectors = [];
    if (this.exisingTransits && this.exisingTransits.length > 0) {
      //need to add code for existing transits
    }

    this.addTransit();
  }

  addTransit() {
    console.log(this.transitDetails);
    //Adding code for selected unit sector
    this.resetUnitSectorSelection();
    let transit: TransitDetail = {
      count: 0,
      harvestId: this.data.harvestData.id,
      staffInCharge: '',
      unitId: this.data.harvestData.unit.id,
      unitSectorId: 0,
    };
    this.transitDetails.push(transit);
  }

  deleteTransit(index: number) {
    if (this.transitDetails.length > 1) {
      this.transitDetails.splice(index, 1);
      this.calculateCount();
      this.resetUnitSectorSelection();
    }
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
      (x) => x.count > 0 && x.staffInCharge && x.unitSectorId && x.harvestId,
    );
    if (!isValid) {
      this.showError = true;
      this.nsService.showMessage(
        SEVERITY.ERROR,
        'Please fill all required transit details before saving.',
      );
      return;
    }

    this.dialogRef.close({
      transits: this.transitDetails,
      harvestId: this.data.harvestData.id,
    });
  }
  resetUnitSectorSelection() {
    this.allUnitSectors.forEach((s: UnitSector) => {
      s.isSelected = false; // Reset selection state for all sectors
    });
    if (this.transitDetails.length > 0) {
      this.allUnitSectors.forEach((s: UnitSector) => {
        this.transitDetails.forEach((x) => {
          if (s.id === x.unitSectorId) {
            s.isSelected = true;
          }
        });
      });
    }
  }
}
