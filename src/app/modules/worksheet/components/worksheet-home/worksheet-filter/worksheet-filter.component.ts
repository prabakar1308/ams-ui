import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatRadioChange } from '@angular/material/radio';

import { WorksheetStatus } from '@app/shared/models/worksheet-status';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { UserDetails } from '@app/shared/models/user-details';
import { WorksheetFilter } from '@app/shared/models/shared-state';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';

@Component({
  selector: 'app-worksheet-filter',
  standalone: false,
  templateUrl: './worksheet-filter.component.html',
  styleUrl: './worksheet-filter.component.scss',
})
export class WorksheetFilterComponent implements OnInit, OnDestroy {
  @Input() disableCreate = false;
  private unSubscribe = new Subject<void>();
  selectedUser: number = 0;
  userDetails: UserDetails[] | null = null;
  worksheetFilter: WorksheetFilter = {};
  selectedStatus: number = 0;
  statusDetails: WorksheetStatus[] | null = null;

  constructor(
    private sharedFacade: SharedFacadeService,
    private worksheetFacadeService: WorksheetFacadeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.sharedFacade.getWorksheetStatus();
    this.sharedFacade.getUsersList();

    // subscriptions
    this.sharedFacade.worksheetStatus$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.statusDetails = [{ id: 0 }, ...data];
    });

    this.sharedFacade.userData$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.userDetails = [{ id: 0 }, ...data];
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

  onCreateWorksheet() {
    this.router.navigate(['/worksheet/create']);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
