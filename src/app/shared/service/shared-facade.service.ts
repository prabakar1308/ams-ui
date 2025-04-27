import { Injectable } from '@angular/core';
import { MetaState } from '@shared/models/meta-state';
import { StatusDetails } from '@shared/models/status-details';
import { BehaviorSubject, Observable } from 'rxjs';
import * as fromStore from '../state';
import { Store } from '@ngrx/store';
import * as sharedAction from '../state/shared-actions';
import { UserDetails } from '@shared/models/user-details';

@Injectable({
  providedIn: 'root'
})
export class SharedFacadeService {
statusData$: Observable<StatusDetails>;
userData$: Observable<UserDetails>;
  meta$: Observable<MetaState>;
  public statusSubject: BehaviorSubject<any>;
  public statusData: Observable<any>;
  public userSubject: BehaviorSubject<any>;
  public userDerails: Observable<any>;
  constructor(private store: Store<fromStore.AppState>) {
      this.statusData$ = this.store.select(fromStore.getStatusData);
      this.userData$ = this.store.select(fromStore.getUserData);
      this.meta$ = this.store.select(fromStore.getMetaInfo);
  
      const statusList = localStorage.getItem('statusData');
      const userList = localStorage.getItem('userDerails');
      this.userSubject = new BehaviorSubject<any>(userList ? JSON.parse(userList) : null);
      this.statusSubject = new BehaviorSubject<any>(statusList ? JSON.parse(statusList) : null);
      this.statusData = this.statusSubject.asObservable();
      this.userDerails = this.userSubject.asObservable();
    }

    getStatusData() {
        this.store.dispatch(sharedAction.getStatusData());
      }

    getStatusDataSuccess(response: StatusDetails) {
        this.store.dispatch(sharedAction.getStatusSuccess(response));
      }

      getUserDetails() {
        this.store.dispatch(sharedAction.getUserDetails());
      }

    getUserDataSuccess(response: UserDetails) {
        this.store.dispatch(sharedAction.getUserSuccess(response));
      }
}
