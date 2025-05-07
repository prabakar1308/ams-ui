import { createReducer, on } from '@ngrx/store';

import { WorksheetState } from './../models/worksheet-state';
import * as WorksheetActions from './worksheet.actions';

export const initialState: WorksheetState = {
  activeWorksheets: [],
  createWorksheet: {
    tankType: 0,
    tanks: [],
  },
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
  on(WorksheetActions.createWorksheet, (state, { payload }) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(WorksheetActions.createWorksheetSuccess, (state, { payload }) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
  on(WorksheetActions.updateWorksheetTankDetails, (state, { payload }) => ({
    ...state,
    createWorksheet: payload,
  })),
);
