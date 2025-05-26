import { createAction } from '@ngrx/store';
import { DashboardResponse, ProductionCount } from '../models/dashboard-response';
import { DashboardRequest } from '../models/dashboard-request';

export const getDashboardData = createAction(
  '[Dashboard] Get Tank Data',
  (payload: DashboardRequest) => ({ payload }),
);

export const getDashboardDataSuccess = createAction(
  '[Dashboard] Get Tank Data Success',
  (payload: DashboardResponse) => ({ payload }),
);

export const getDashboardDataFailure = createAction(
  '[Dashboard] Get Tank Data Failure',
  (payload: { error: string }) => ({ payload }),
);

export const getProductionData = createAction(
  '[Dashboard] Get Production Data',
  // (payload: DashboardRequest) => ({ payload }),
);

export const getProductionDataSuccess = createAction(
  '[Dashboard] Get Production Data Success',
  (payload: ProductionCount) => ({ payload }),
);
