import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorksheetStatus } from '@app/shared/models/worksheet-status';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { Output, EventEmitter } from '@angular/core';
import { UserDetails } from '@app/shared/models/user-details';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-worksheet-filter',
  standalone: false,
  templateUrl: './worksheet-filter.component.html',
  styleUrl: './worksheet-filter.component.scss',
})
export class WorksheetFilterComponent implements OnInit, OnDestroy {
  private unSubscribe = new Subject<void>();
  @Output() changeStatus = new EventEmitter<number>();
  @Output() changeUser = new EventEmitter<number>();
  @Output() changeTankType = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();
  selectedUser: number = 0;
  userDetails: UserDetails[] | null = null;

  selectedStatus: number = 0;
  statusDetails: WorksheetStatus[] | null = null;
  constructor(
    private sharedFacade: SharedFacadeService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.sharedFacade.getWorksheetStatus();
    this.sharedFacade.getUsersList();

    // subscriptions
    this.sharedFacade.worksheetStatus$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.statusDetails = data;
    });

    this.sharedFacade.userData$.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.userDetails = data;
    });
  }

  onStatusChange(event: any) {
    this.selectedStatus = event;
    this.changeStatus.emit(this.selectedStatus);
  }
  onUserChange(event: any) {
    this.selectedUser = event;
    this.changeUser.emit(this.selectedUser);
  }

  onTankTypeChange(event: any) {
    this.changeTankType.emit(event);
  }

  onRefresh() {
    this.refresh.emit();
  }

  onCreateWorksheet() {
    this.router.navigate(['/worksheet/create']);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
