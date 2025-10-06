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
  harvestData: { data: [], totalRecords: 0 },
  currentHarvest: null,
  meta: {
    isLoading: false,
    error: '',
  },
  monitoringCount: {
    id: 0,
    millionsHarvested: 0,
    frozenCupsHarvested: 0,
    millionsTransited: 0,
    frozenCupsTransited: 0,
  },
};

export const worksheetReducer = createReducer(
  initialState,
  // Handle the actions here
  on(WorksheetActions.getCurrentWorksheetSucess, (state, { payload }) => ({
    ...state,
    currentWorksheet: payload,
  })),
  on(WorksheetActions.resetCurrentWorksheet, (state) => ({
    ...state,
    currentWorksheet: null,
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
  on(WorksheetActions.getCurrentHarvestSuccess, (state, { payload }) => ({
    ...state,
    currentHarvest: payload,
  })),
  on(WorksheetActions.getHarvestsSuccess, (state, { payload }) => ({
    ...state,
    harvestData: payload,
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
  // Monitoring Count
  on(WorksheetActions.getMonitoringCountSuccess, (state, { payload }) => ({
    ...state,
    monitoringCount: payload,
  })),
);
