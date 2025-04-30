import { createAction } from '@ngrx/store';
import { DashboardResponse } from '../models/dashboard-response';
import { DashboardRequest } from '../models/dashboard-request';

export const getDashboardData = createAction(
  '[Dashboard] Get Production Data',
  (payload: DashboardRequest) => ({ payload }),
);

export const getDashboardDataSuccess = createAction(
  '[Dashboard] Get Production Data Success',
  (payload: DashboardResponse) => ({ payload }),
);

export const getDashboardDataFailure = createAction(
  '[Dashboard] Get Production Data Failure',
  (payload: { error: string }) => ({ payload }),
);
