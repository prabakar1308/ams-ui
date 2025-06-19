import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthState } from '../models/auth-state';

export const initialState: AuthState = {
  isAuthenticated: false,
  userRole: '',
  userName: '',
  userId: '',
  accessToken: '',
  refreshToken: '',
  meta: {
    isLoading: false,
    error: '',
  },
};

export const authReducer = createReducer(
  initialState,
  // Handle the actions here
  on(AuthActions.userLogin, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(AuthActions.userLoginSuccess, (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    userRole: payload.userRole,
    userName: payload.userName,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    isAuthenticated: true,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  })),
  on(AuthActions.userLoginFailure, (state, { payload }) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
      error: payload.error,
    },
  })),
);
