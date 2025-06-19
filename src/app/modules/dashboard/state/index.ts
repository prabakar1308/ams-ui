import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app-state';
import { DashboardState } from '../models/dashboard-state';

export interface AppState extends fromRoot.AppState {
  dashboard: DashboardState;
}

const getDashboardFeatureState = createFeatureSelector<DashboardState>('dashboard');

export const getDashboardData = createSelector(
  getDashboardFeatureState,
  (state: DashboardState) => state.production,
);

export const getProductionData = createSelector(
  getDashboardFeatureState,
  (state: DashboardState) => state.productionCount,
);

export const getMetaInfo = createSelector(getDashboardFeatureState, (state) => state.meta);
