import { Injectable } from '@angular/core';
import { DashboardResponse } from '../models/dashboard-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { MetaState } from '@app/shared/models/meta-state';
import { Store } from '@ngrx/store';
import * as fromStore from '../state';
import * as dashboardActions from '../state/dashboard.actions';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacadeService {
  dashboardData$: Observable<DashboardResponse>;
  meta$: Observable<MetaState>;
  constructor(private store: Store<fromStore.AppState>) {
    this.dashboardData$ = this.store.select(fromStore.getDashboardData);
    this.meta$ = this.store.select(fromStore.getMetaInfo);
  }

  getDashboardData(userId: number, tankTypeId: number, statusId: number) {
    this.store.dispatch(dashboardActions.getDashboardData({ userId, tankTypeId, statusId }));
  }

  getDashboardDataSuccess(response: DashboardResponse) {
    this.store.dispatch(dashboardActions.getDashboardDataSuccess(response));
  }
}
