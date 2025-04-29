import { createReducer, on } from '@ngrx/store';

import { WorksheetState } from './../models/worksheet-state';
import * as WorksheetActions from './worksheet.actions';

export const initialState: WorksheetState = {
  activeWorksheets: [],
  meta: {
    isLoading: false,
    error: '',
  },
};

export const worksheetReducer = createReducer(
  initialState,
  // Handle the actions here
  on(WorksheetActions.getActiveWorksheetsSuccess, (state, { payload }) => ({
    ...state,
    activeWorksheets: payload,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(WorksheetActions.getActiveWorksheets, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
  on(WorksheetActions.saveWorksheet, (state, { payload }) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(WorksheetActions.saveWorksheetSuccess, (state, { payload }) => ({
    ...state,
    worksheet: payload,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
);
