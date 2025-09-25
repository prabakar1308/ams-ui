import { createReducer, on } from '@ngrx/store';
import { SharedState } from '@app/shared/models/shared-state';
import * as SharedActions from './shared-actions';
import { DEFAULT_TANK_TYPE } from '../constants/shared.contants';
import { FM_USER } from '@app/core/core.contants';

const defaultRangeValues = {
  id: 0,
  min: 0,
  max: 0,
  defaultValue: 0,
  step: 0,
  unitName: '',
};

export const initialState: SharedState = {
  worksheetStatus: [],
  userDetails: [],
  worksheetFilter: {
    statusId: 0,
    userId: 0,
    tankTypeId: DEFAULT_TANK_TYPE,
    harvestTypeId: 0,
  },
  harvestTypes: [],
  tankTypes: [],
  units: [],
  worksheetUnits: [],
  ph: defaultRangeValues,
  salnity: defaultRangeValues,
  temperature: defaultRangeValues,
  unitSectors: [],
  sourceTrackerList: [],
  meta: {
    isLoading: false,
    error: '',
    userUpdated: false,
  },
};

export const sharedReducer = createReducer(
  initialState,
  // Handle the actions here
  on(SharedActions.getWorksheetStatusSuccess, (state, { payload }) => ({
    ...state,
    worksheetStatus: payload,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(SharedActions.getWorksheetStatus, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
  on(SharedActions.getUsersListSuccess, (state, { payload }) => ({
    ...state,
    userDetails: payload.filter((user) => user.role !== FM_USER),
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(SharedActions.getUsersList, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
  on(SharedActions.updateWorksheetFilter, (state, { payload }) => ({
    ...state,
    worksheetFilter: {
      ...state.worksheetFilter,
      ...payload,
    },
  })),
  on(SharedActions.resetUserUpdateStatus, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      userUpdated: false,
    },
  })),
  on(SharedActions.updateUserSuccess, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      userUpdated: true,
    },
  })),
  on(SharedActions.createUserSuccess, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      userUpdated: true,
    },
  })),
  on(SharedActions.getMasterDataSuccess, (state, { payload }) => ({
    ...state,
    harvestTypes: payload.harvestTypes,
    tankTypes: payload.tankTypes,
    units: payload.units,
    ph: payload.ph,
    salnity: payload.salnity,
    temperature: payload.temperature,
    unitSectors: payload.unitSectors,
    worksheetUnits: payload.worksheetUnits,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(SharedActions.resetWorksheetUnitUpdateStatus, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      worksheetUnitUpdated: false,
    },
  })),
  on(SharedActions.updateWorksheetUnitSuccess, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      worksheetUnitUpdated: true,
    },
  })),
  on(SharedActions.createWorksheetUnitSuccess, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      worksheetUnitUpdated: true,
    },
  })),
  on(SharedActions.resetUserPasswordSuccess, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      resetPassword: true,
    },
  })),
  on(SharedActions.getSourceTrackerSuccess, (state, { payload }) => ({
    ...state,
    sourceTrackerList: payload,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(SharedActions.getSourceTrackerList, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
);
