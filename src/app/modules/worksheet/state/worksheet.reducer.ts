import { createReducer, on } from '@ngrx/store';

import { WorksheetState } from './../models/worksheet-state';
import * as WorksheetActions from './worksheet.actions';
import { HarvestState } from '../models/harvest-state';

export const initialState: WorksheetState = {
  currentWorksheet: null,
  activeWorksheets: [],
  createWorksheet: {
    tankType: 0,
    tanks: [],
  },
  activeRestocks: [],
  transits: [],
  harvestList: [],
  meta: {
    isLoading: false,
    error: '',
  },
};

export const worksheetReducer = createReducer(
  initialState,
  // Handle the actions here
  on(WorksheetActions.getCurrentWorksheetSucess, (state, { payload }) => ({
    ...state,
    currentWorksheet: payload,
  })),
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
  // Restock
  on(WorksheetActions.getActiveRestocksSuccess, (state, { payload }) => ({
    ...state,
    activeRestocks: payload,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(WorksheetActions.getActiveRestocks, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
  // Transits
  on(WorksheetActions.getTransitsSuccess, (state, { payload }) => ({
    ...state,
    transits: payload,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  // Harvest Details
  on(WorksheetActions.getHarvestsSuccess, (state, { payload }) => ({
    ...state,
    harvestList: payload,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(WorksheetActions.getHarvests, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
);
