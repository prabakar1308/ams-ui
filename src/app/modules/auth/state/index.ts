import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app-state';
import { AuthState } from '../models/auth-state';

export interface AppState extends fromRoot.AppState {
  auth: AuthState;
}

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getUserData = createSelector(
  getAuthFeatureState,
  (state: AuthState) => ({
    userId: state.userId,
    userRole: state.userRole,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  })
);

export const getMetaInfo = createSelector(
  getAuthFeatureState,
  (state) => state.meta
);
