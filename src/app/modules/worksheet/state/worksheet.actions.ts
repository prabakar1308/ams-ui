import { createAction } from '@ngrx/store';
import { WorksheetTank } from '../models/active-worksheet';
import { WorksheetFilter } from '@app/shared/models/shared-state';
import {
  CreateWorksheetRequest,
  TankSelection,
  UpdateWorksheetRequest,
} from '../models/create-worksheet';
import { ActiveRestock } from '../models/restock';

export const getActiveWorksheets = createAction(
  '[Worksheet] Get Active Worksheets',
  (payload: WorksheetFilter) => ({ payload }),
);

export const getActiveWorksheetsSuccess = createAction(
  '[Worksheet] Get Active Worksheets Success',
  (payload: WorksheetTank[]) => ({ payload }),
);

export const getActiveWorksheetsFailure = createAction(
  '[Worksheet] Get Active Worksheets Failure',
  (payload: { error: string }) => ({ payload }),
);

export const createWorksheet = createAction(
  '[Worksheet] Create Worksheet',
  (payload: CreateWorksheetRequest) => ({
    payload,
  }),
);

export const createWorksheetSuccess = createAction(
  '[Worksheet] Create Worksheet Success',
  (payload: WorksheetTank[]) => ({ payload }),
);

export const createWorksheetFailure = createAction(
  '[Worksheet] Create Worksheet Failure',
  (payload: { error: string }) => ({ payload }),
);

export const updateWorksheet = createAction(
  '[Worksheet] Update Worksheet',
  (payload: UpdateWorksheetRequest) => ({
    payload,
  }),
);

export const updateWorksheetFailure = createAction(
  '[Worksheet] Update Worksheet Failure',
  (payload: { error: string }) => ({ payload }),
);

export const updateWorksheetTankDetails = createAction(
  '[Worksheet] Update Worksheet Tank Details',
  (payload: TankSelection) => ({ payload }),
);

// Restock
export const getActiveRestocks = createAction(
  '[Restock] Get Active Restocks',
  (payload: string) => ({ payload }),
);

export const getActiveRestocksSuccess = createAction(
  '[Worksheet] Get Active Restocks Success',
  (payload: ActiveRestock[]) => ({ payload }),
);

export const getActiveRestocksFailure = createAction(
  '[Worksheet] Get Active Restocks Failure',
  (payload: { error: string }) => ({ payload }),
);
