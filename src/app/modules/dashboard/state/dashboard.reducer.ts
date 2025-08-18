import { createReducer, on } from '@ngrx/store';

import { DashboardState } from './../models/dashboard-state';
import * as DashboardActions from './dashboard.actions';

export const initialState: DashboardState = {
  production: null,
  machineryTanks: [],
  conventionalTanks: [],
  productionCount: {
    frozenAvailable: 0,
    frozenCompleted: 0,
    liveAvailable: 0,
    liveCompleted: 0,
    activeRestock: 0,
    inUseRestock: 0,
    instockConventional: [],
    instockMachinery: [],
  },
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
  on(DashboardActions.getProductionDataSuccess, (state, { payload }) => ({
    ...state,
    productionCount: payload,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(DashboardActions.getMachineryTanksSuccess, (state, { payload }) => ({
    ...state,
    machineryTanks: payload,
  })),
  on(DashboardActions.getConventionalTanksSuccess, (state, { payload }) => ({
    ...state,
    conventionalTanks: payload,
  })),
);
