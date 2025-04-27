import { createReducer, on } from '@ngrx/store';
import { StatusState } from '@shared/models/status-state';
import * as SharedActions from './shared-actions';
import { UserState } from '@shared/models/user-state';

export const initialState: StatusState = {
    id: 0,
    value: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: '',
    createdBy: 0,
    updatedBy: 0,
  meta: {
    isLoading: false,
    error: '',
  },
};


export const statusReducer = createReducer(
  initialState,
  // Handle the actions here
  on(SharedActions.getStatusSuccess, (state, { payload }) => ({
    ...state,
    id: payload.id,
    value: payload.value,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
    description: payload.description,
    createdBy: payload.createdBy,
    updatedBy: payload.updatedBy,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(SharedActions.getStatusData, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  }))
);
