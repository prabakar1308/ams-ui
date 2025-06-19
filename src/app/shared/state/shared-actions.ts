import { createAction } from '@ngrx/store';
import { WorksheetStatus } from '@app/shared/models/worksheet-status';
import { UserDetails } from '@app/shared/models/user-details';
import { MasterData, WorksheetFilter } from '../models/shared-state';
import { CreateUserRequest } from '../models/create-user';

export const getWorksheetStatus = createAction('[Shared] Get Worksheet Status');

export const getWorksheetStatusSuccess = createAction(
  '[Shared] Get Worksheet Status Success',
  (payload: WorksheetStatus[]) => ({ payload }),
);

export const getWorksheetStatusFailure = createAction(
  '[Shared] Get Worksheet Status Failure',
  (payload: { error: string }) => ({ payload }),
);

export const getUsersList = createAction('[Shared] Get Users List');

export const getUsersListSuccess = createAction(
  '[Shared] Get Users List Success',
  (payload: UserDetails[]) => ({ payload }),
);

export const getUsersListFailure = createAction(
  '[Shared] Load User Failure',
  (payload: { error: string }) => ({ payload }),
);

export const updateWorksheetFilter = createAction(
  '[Shared] Update Worksheet Filter Data',
  (payload: WorksheetFilter) => ({ payload }),
);

export const getMasterData = createAction('[Shared] Get Master Data');
export const getMasterDataSuccess = createAction(
  '[Shared] Get Master Data Success',
  (payload: MasterData) => ({ payload }),
);

export const getMasterDataFailure = createAction(
  '[Shared] Get Master Data Failure',
  (payload: { error: string }) => ({ payload }),
);

export const createUser = createAction('[Master] Create User', (payload: CreateUserRequest) => ({
  payload,
}));

export const createUserSuccess = createAction('[Master] Create User Success', (payload: any[]) => ({
  payload,
}));

export const createUserFailure = createAction(
  '[Master] Create User Failure',
  (payload: { error: string }) => ({ payload }),
);
export const updateUser = createAction('[Master] Update User', (payload: any) => ({
  payload,
}));

export const updateUserSuccess = createAction('[Master] Update User Success', (payload: any[]) => ({
  payload,
}));

export const updateUserFailure = createAction(
  '[Master] Update User Failure',
  (payload: { error: string }) => ({ payload }),
);

export const deleteUser = createAction('[Master] Delete User', (payload: number) => ({
  payload,
}));

export const deleteUserSuccess = createAction(
  '[Master] Delete User Success',
  (payload: number) => ({
    payload,
  }),
);

export const deleteUserFailure = createAction(
  '[Master] Delete User Failure',
  (payload: { error: string }) => ({ payload }),
);

export const resetUserUpdateStatus = createAction('[Master] Reset User Update Status');
