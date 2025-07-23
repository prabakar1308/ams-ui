import { Injectable } from '@angular/core';
import { DashboardResponse, ProductionCount } from '../models/dashboard-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { MetaState } from '@app/shared/models/meta-state';
import { Store } from '@ngrx/store';
import * as fromStore from '../state';
import * as dashboardActions from '../state/dashboard.actions';
import { DashboardTank } from '../models/dashboard-tank';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacadeService {
  dashboardData$: Observable<DashboardResponse>;
  productionCount$: Observable<ProductionCount>;
  meta$: Observable<MetaState>;
  machineryTanks$: Observable<DashboardTank[]>;
  conventionalTanks$: Observable<DashboardTank[]>;

  constructor(private store: Store<fromStore.AppState>) {
    this.dashboardData$ = this.store.select(fromStore.getDashboardData);
    this.productionCount$ = this.store.select(fromStore.getProductionData);
    this.machineryTanks$ = this.store.select(fromStore.getMachineryTanks);
    this.conventionalTanks$ = this.store.select(fromStore.getConventionalTanks);
    this.meta$ = this.store.select(fromStore.getMetaInfo);
  }

  getDashboardData(userId: number, tankTypeId: number, statusId: number) {
    this.store.dispatch(dashboardActions.getDashboardData({ userId, tankTypeId, statusId }));
  }

  getProductionData() {
    this.store.dispatch(dashboardActions.getProductionData());
  }

  getMachineryTanks() {
    this.store.dispatch(dashboardActions.getMachineryTanks());
  }

  getConventionalTanks() {
    this.store.dispatch(dashboardActions.getConventionalTanks());
  }
}
