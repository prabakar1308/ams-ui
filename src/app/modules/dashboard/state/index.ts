import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app-state';
import { DashboardState } from '../models/dashboard-state';

export interface AppState extends fromRoot.AppState {
  dashboard: DashboardState;
}

const getDashboardFeatureState =
  createFeatureSelector<DashboardState>('dashboard');

export const getTankDetails = createSelector(
  getDashboardFeatureState,
  (state) => state.tankDetails
);

export const getMetaInfo = createSelector(
  getDashboardFeatureState,
  (state) => state.meta
);
