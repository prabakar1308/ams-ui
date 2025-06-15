import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { WorksheetStatus } from '@app/shared/models/worksheet-status';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { UserDetails } from '@app/shared/models/user-details';
import { WorksheetFilter } from '@app/shared/models/shared-state';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { WorksheetTank } from '@app/worksheet/models/active-worksheet';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HarvestType } from '@app/shared/models/master';
import { WorksheetNavigationComponent } from '../worksheet-navigation/worksheet-navigation.component';

@Component({
  selector: 'app-worksheet-filter',
  standalone: false,
  templateUrl: './worksheet-filter.component.html',
  styleUrl: './worksheet-filter.component.scss',
})
export class WorksheetFilterComponent implements OnInit, OnDestroy {
  @Input() disableCreate = false;
  @Input() selectedItems: WorksheetTank[] = [];

  private _bottomSheet = inject(MatBottomSheet);
  private unSubscribe = new Subject<void>();
  selectedUser: number = 0;
  userDetails: UserDetails[] | null = null;
  worksheetFilter: WorksheetFilter = {};
  selectedStatus: number = 0;
  statusDetails: WorksheetStatus[] | null = null;
  harvestTypes: HarvestType[] = [];

  constructor(
    private sharedFacade: SharedFacadeService,
    private worksheetFacadeService: WorksheetFacadeService,
    private router: Router,
  ) {}

  ngOnInit() {
    // subscriptions
    this.sharedFacade.worksheetStatus$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.statusDetails = [{ id: 0 }, ...data];
    });

    this.sharedFacade.userData$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.userDetails = [{ id: 0 }, ...data];
    });

    this.sharedFacade.harvestTypes$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.harvestTypes = [{ id: 0, value: 'All' }, ...data];
    });

    this.sharedFacade.worksheetFilter$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.worksheetFilter = data;
        this.onRefresh();
      });
  }

  onStatusChange(event: number) {
    this.sharedFacade.updateWorksheetFilter({ statusId: event });
  }

  onUserChange(event: number) {
    this.sharedFacade.updateWorksheetFilter({ userId: event });
  }

  onTankTypeChange(event: any) {
    this.sharedFacade.updateWorksheetFilter({ tankTypeId: event.value });
  }

  onRefresh() {
    this.worksheetFacadeService.getActiveWorksheets(this.worksheetFilter);
  }

  onHarvestTypeChange(event: any) {
    this.sharedFacade.updateWorksheetFilter({ harvestTypeId: event });
  }

  onCreateWorksheet() {
    this.worksheetFacadeService.updateWorksheetTankSelection({
      tankType: this.worksheetFilter.tankTypeId,
      tanks: this.selectedItems.map((item) => item.tankNumber),
    });
    this.router.navigate(['/worksheet/create']);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(WorksheetNavigationComponent);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
