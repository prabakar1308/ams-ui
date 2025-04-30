import { createReducer, on } from '@ngrx/store';
import { SharedState } from '@app/shared/models/shared-state';
import * as SharedActions from './shared-actions';

export const initialState: SharedState = {
  worksheetStatus: [],
  userDetails: [],
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
);
