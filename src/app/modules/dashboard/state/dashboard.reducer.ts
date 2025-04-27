import { createReducer, on } from '@ngrx/store';

import { DashboardState } from './../models/dashboard-state';
import * as DashboardActions from './dashboard.actions';

export const initialState: DashboardState = {
  tankNumber: 0,
  worksheet: {
    id: 0,
    tankNumber: 0,
    createdBy: null,
    updatedBy: null,
    status: {
      id: 0,
    value: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "",
    createdBy: 0,
    updatedBy: 0
    },
    ph: null,
    salnity: null,
    temperature: null,
    tankType: null,
    harvestType: null,
    harvestTime: null,
    inputSource: null,
    inputCount: null,
    sourceUnitName: null,
    user: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    userId: "",
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
    tankNumber: payload.tankNumber,
    worksheet: payload.worksheet,
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
  }))
);
