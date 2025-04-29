import { createAction } from '@ngrx/store';
import { WorksheetStatus } from '@shared/models/worksheet-status';
import { UserDetails } from '@shared/models/user-details';

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
