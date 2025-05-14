import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MetaState } from '@app/shared/models/meta-state';
import { WorksheetStatus } from '@app/shared/models/worksheet-status';
import { UserDetails } from '@app/shared/models/user-details';
import * as fromStore from '../state';
import * as sharedAction from '../state/shared-actions';
import { MasterData, WorksheetFilter } from '../models/shared-state';

@Injectable({
  providedIn: 'root',
})
export class SharedFacadeService {
  worksheetStatus$: Observable<WorksheetStatus[]>;
  userData$: Observable<UserDetails[]>;
  masterData$: Observable<MasterData>;
  worksheetFilter$: Observable<WorksheetFilter>;
  meta$: Observable<MetaState>;

  constructor(private store: Store<fromStore.AppState>) {
    this.masterData$ = this.store.select(fromStore.getMasterData);
    this.worksheetStatus$ = this.store.select(fromStore.getWorksheetStatus);
    this.userData$ = this.store.select(fromStore.getUserData);
    this.worksheetFilter$ = this.store.select(fromStore.getWorksheetFilter);
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

  updateWorksheetFilter(payload: WorksheetFilter) {
    this.store.dispatch(sharedAction.updateWorksheetFilter(payload));
  }

  getMasterData() {
    this.store.dispatch(sharedAction.getMasterData());
  }
}
