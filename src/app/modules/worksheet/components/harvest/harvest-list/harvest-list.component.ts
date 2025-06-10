import { Component, inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '@app/shared/models/user-details';
import { HarvestDetails } from '@app/worksheet/models/harvest-details';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { HarvestListPopupComponent } from '../harvest-list-popup/harvest-list-popup.component';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { UnitSector } from '@app/shared/models/master';
import { HarvestFilter } from '@app/shared/models/shared-state';

@Component({
  selector: 'app-harvest-list',
  standalone: false,
  templateUrl: './harvest-list.component.html',
  styleUrl: './harvest-list.component.scss',
})
export class HarvestListComponent {
  private unSubscribe = new Subject<void>();
  dataSource = new MatTableDataSource<HarvestDetails>();
  displayedColumns = [
    'tank',
    'harvest',
    'count_measured',
    'count_remining',
    'measured_by',
    'createdDate',
    'action',
  ];
  userDetails: UserDetails[] = [];
  unitSectors: UnitSector[] = [];

  // Add input parameter
  @Input()
  unitId!: number;

  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private dialog: MatDialog,
  ) {}
  ngOnInit() {
    this.worksheetFacadeService.activeHarvestList$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.dataSource.data = data;
      });
    //masterData$
    this.sharedFacadeService.userData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.userDetails = data;
      });
    this.sharedFacadeService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.unitSectors = data.unitSectors;
      });
  }

  openDialog(element: HarvestDetails) {
    const data = {
      harvestData: element,
      userDetails: this.userDetails,
      unitSectors: this.unitSectors,
    };
    const dialogRef = this.dialog.open(HarvestListPopupComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let filter: HarvestFilter = {
          unitId: this.unitId || 1, // Default to 1 if unitId is not provided
          statusIds: ['A', 'P'],
        };
        this.worksheetFacadeService.createTransit({ ...result, filter });
      }
    });
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
