import { createAction } from '@ngrx/store';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';

export const userLogin = createAction(
  '[Auth] User Login',
  (payload: AuthRequest) => ({ payload })
);

export const userLoginSuccess = createAction(
  '[Auth] User Login Success',
  (payload: AuthResponse) => ({ payload })
);

export const userLoginFailure = createAction(
  '[Auth] User Login Failure',
  (payload: { error: string }) => ({ payload })
);
