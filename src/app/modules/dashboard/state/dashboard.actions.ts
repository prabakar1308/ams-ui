import { createAction } from '@ngrx/store';
import { DashboardResponse } from '../models/dashboard-response';
import { DashboardRequest } from '../models/dashboard-request';

export const getDashboardData = createAction(
  '[Dashboard] Load Tank Details',
  (payload: DashboardRequest) => ({ payload })
);

export const getDashboardDataSuccess = createAction(
  '[Dashboard] Load Tank Details Success',
  (payload: DashboardResponse) => ({ payload })
);

export const loadTankDetailsFailure = createAction(
  '[Dashboard] Load Tank Failure',
  (payload: { error: string }) => ({ payload })
);
