import { createAction } from '@ngrx/store';
import { WorksheetTank } from '../models/active-worksheet';
import { WorksheetFilter } from '@app/shared/models/shared-state';
import { TankSelection } from '../models/create-worksheet';

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

export const saveWorksheet = createAction('[Worksheet] Save Worksheet', (payload: any) => ({
  payload,
}));

export const saveWorksheetSuccess = createAction(
  '[Worksheet] Save Worksheet Success',
  (payload: any) => ({ payload }),
);

export const updateWorksheetTankDetails = createAction(
  '[Worksheet] Update Worksheet Tank Details',
  (payload: TankSelection) => ({ payload }),
);
