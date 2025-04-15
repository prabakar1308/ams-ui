import { createReducer, on } from '@ngrx/store';

import { WorksheetState } from './../models/worksheet-state';
import * as DashboardActions from './worksheet.actions';

export const initialState: WorksheetState = {
  worksheet: {},
  meta: {
    isLoading: false,
  },
};

export const worksheetReducer = createReducer(
  initialState,
  // Handle the actions here
  on(DashboardActions.saveWorksheet, (state, { payload }) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(DashboardActions.saveWorksheetSuccess, (state, { payload }) => ({
    ...state,
    worksheet: payload,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  }))
);
