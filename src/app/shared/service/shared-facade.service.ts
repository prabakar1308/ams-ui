import { Injectable } from '@angular/core';
import { MetaState } from '@shared/models/meta-state';
import { WorksheetStatus } from '@shared/models/worksheet-status';
import { BehaviorSubject, Observable } from 'rxjs';
import * as fromStore from '../state';
import { Store } from '@ngrx/store';
import * as sharedAction from '../state/shared-actions';
import { UserDetails } from '@shared/models/user-details';

@Injectable({
  providedIn: 'root',
})
export class SharedFacadeService {
  worksheetStatus$: Observable<WorksheetStatus[]>;
  userData$: Observable<UserDetails[]>;
  meta$: Observable<MetaState>;

  constructor(private store: Store<fromStore.AppState>) {
    this.worksheetStatus$ = this.store.select(fromStore.getWorksheetStatus);
    this.userData$ = this.store.select(fromStore.getUserData);
    this.meta$ = this.store.select(fromStore.getMetaInfo);
  }

  getWorksheetStatus() {
    this.store.dispatch(sharedAction.getWorksheetStatus());
  }

  getWorksheetStatusSuccess(response: WorksheetStatus[]) {
    this.store.dispatch(sharedAction.getWorksheetStatusSuccess(response));
  }

  getUsersList() {
    this.store.dispatch(sharedAction.getUsersList());
  }

  getUserDetailsSuccess(response: UserDetails[]) {
    this.store.dispatch(sharedAction.getUsersListSuccess(response));
  }
}
