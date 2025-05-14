import { createReducer, on } from '@ngrx/store';
import { SharedState } from '@app/shared/models/shared-state';
import * as SharedActions from './shared-actions';
import { DEFAULT_TANK_TYPE } from '../constants/shared.contants';

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
  },
  harvestTypes: [],
  tankTypes: [],
  units: [],
  ph: defaultRangeValues,
  salnity: defaultRangeValues,
  temperature: defaultRangeValues,
  meta: {
    isLoading: false,
    error: '',
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
    userDetails: payload,
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
  on(SharedActions.getMasterDataSuccess, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
);
