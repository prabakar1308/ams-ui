import { createReducer, on } from '@ngrx/store';

import { DashboardState } from './../models/dashboard-state';
import * as DashboardActions from './dashboard.actions';

export const initialState: DashboardState = {
  tankDetails: [],
  meta: {
    isLoading: false,
  },
};

export const dashboardReducer = createReducer(
  initialState,
  // Handle the actions here
  on(DashboardActions.loadTankDetails, (state, { payload }) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(DashboardActions.loadTankDetailsSuccess, (state, { payload }) => ({
    ...state,
    tankDetails: payload.tankDetails,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  }))
);
