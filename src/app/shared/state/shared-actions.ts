import { createAction } from '@ngrx/store';
import { WorksheetStatus } from '@app/shared/models/worksheet-status';
import { ResetUserPassword, UserDetails } from '@app/shared/models/user-details';
import { MasterData, WorksheetFilter } from '../models/shared-state';
import { CreateUserRequest } from '../models/create-user';
import { CreateWorksheetUnitRequest } from '../models/create-worksheet-unit';
import { SourceTracker } from '../models/master';
import { CreateSourceTrackerRequest } from '../models/create-source-tracker';

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

export const createWorksheetUnit = createAction(
  '[Master] Create WorksheetUnit',
  (payload: CreateWorksheetUnitRequest) => ({
    payload,
  }),
);

export const createWorksheetUnitSuccess = createAction(
  '[Master] Create WorksheetUnit Success',
  (payload: any[]) => ({
    payload,
  }),
);

export const createWorksheetUnitFailure = createAction(
  '[Master] Create WorksheetUnit Failure',
  (payload: { error: string }) => ({ payload }),
);
export const updateWorksheetUnit = createAction(
  '[Master] Update WorksheetUnit',
  (payload: any) => ({
    payload,
  }),
);

export const updateWorksheetUnitSuccess = createAction(
  '[Master] Update WorksheetUnit Success',
  (payload: any[]) => ({
    payload,
  }),
);

export const resetWorksheetUnitUpdateStatus = createAction(
  '[Master] Reset Worksheet Unit Update Status',
);

export const resetUserPassword = createAction(
  '[User] Reset User Password',
  (payload: ResetUserPassword) => ({
    payload,
  }),
);

export const resetUserPasswordSuccess = createAction(
  '[User] Reset User Password Success',
  (payload: any[]) => ({
    payload,
  }),
);

export const resetUserPasswordFailure = createAction(
  '[User] Reset User Password Failure',
  (payload: { error: string }) => ({ payload }),
);
export const getSourceTrackerList = createAction(
  '[Shared] Get Source Tracker List',
  (payload: any[]) => ({ payload }),
);
export const getSourceTrackerSuccess = createAction(
  '[Shared] Get Source Tracker Success',
  (payload: SourceTracker) => ({ payload }),
);

export const getSourceTrackerFailure = createAction(
  '[Shared] Get Source Tracker Failure',
  (payload: { error: string }) => ({ payload }),
);
export const createSourceTracker = createAction(
  '[Master] Create SourceTracker',
  (payload: CreateSourceTrackerRequest) => ({
    payload,
  }),
);

export const createSourceTrackerSuccess = createAction(
  '[Master] Create SourceTracker Success',
  (payload: any[]) => ({
    payload,
  }),
);

export const createSourceTrackerFailure = createAction(
  '[Master] Create SourceTracker Failure',
  (payload: { error: string }) => ({ payload }),
);
export const updateSourceTracker = createAction(
  '[Master] Update Source Tracker',
  (payload: any) => ({
    payload,
  }),
);

export const updateSourceTrackerSuccess = createAction(
  '[Master] Update Source Tracker Success',
  (payload: any[]) => ({
    payload,
  }),
);

export const updateSourceTrackerFailure = createAction(
  '[Master] Update Source Tracker Failure',
  (payload: { error: string }) => ({ payload }),
);
export const resetSourceTrackerUpdatedStatus = createAction(
  '[Master] Reset Source Tracker Update Status',
);

export const deleteSourceTracker = createAction(
  '[Master] Delete Source Tracker',
  (payload: number) => ({
    payload,
  }),
);

export const deleteSourceTrackerSuccess = createAction(
  '[Master] Delete Source Tracker Success',
  (payload: number) => ({
    payload,
  }),
);

export const deleteSourceTrackerFailure = createAction(
  '[Master] Delete Source Tracker Failure',
  (payload: { error: string }) => ({ payload }),
);
