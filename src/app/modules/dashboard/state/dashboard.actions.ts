import { createAction } from '@ngrx/store';
import { DashboardResponse, ProductionCount } from '../models/dashboard-response';
import { DashboardRequest } from '../models/dashboard-request';
import { DashboardTank } from '../models/dashboard-tank';

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

export const getMachineryTanks = createAction('[Dashboard] Get Machinery Tanks');

export const getMachineryTanksSuccess = createAction(
  '[Dashboard] Get Machinery Tanks Success',
  (payload: DashboardTank[]) => ({ payload }),
);

export const getConventionalTanks = createAction('[Dashboard] Get Conventional Tanks');

export const getConventionalTanksSuccess = createAction(
  '[Dashboard] Get Conventional Tanks Success',
  (payload: DashboardTank[]) => ({ payload }),
);

export const getTanksFailure = createAction(
  '[Dashboard] Get Tanks Failure',
  (payload: { error: string }) => ({ payload }),
);
