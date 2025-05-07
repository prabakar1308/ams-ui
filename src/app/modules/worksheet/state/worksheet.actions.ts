import { createAction } from '@ngrx/store';
import { WorksheetTank } from '../models/active-worksheet';
import { WorksheetFilter } from '@app/shared/models/shared-state';
import { CreateWorksheetRequest, TankSelection } from '../models/create-worksheet';

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

export const updateWorksheetTankDetails = createAction(
  '[Worksheet] Update Worksheet Tank Details',
  (payload: TankSelection) => ({ payload }),
);
