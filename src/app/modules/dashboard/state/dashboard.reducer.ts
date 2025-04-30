import { createReducer, on } from '@ngrx/store';

import { DashboardState } from './../models/dashboard-state';
import * as DashboardActions from './dashboard.actions';

export const initialState: DashboardState = {
  production: null,
  meta: {
    isLoading: false,
    error: '',
  },
};

export const dashboardReducer = createReducer(
  initialState,
  // Handle the actions here
  on(DashboardActions.getDashboardDataSuccess, (state, { payload }) => ({
    ...state,
    production: payload,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(DashboardActions.getDashboardData, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
);
