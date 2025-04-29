import { createAction } from '@ngrx/store';
import { ActiveWorksheet, ActiveWorksheetRequest } from '../models/active-worksheet';

export const getActiveWorksheets = createAction(
  '[Worksheet] Get Active Worksheets',
  (payload: ActiveWorksheetRequest) => ({ payload }),
);

export const getActiveWorksheetsSuccess = createAction(
  '[Worksheet] Get Active Worksheets Success',
  (payload: ActiveWorksheet[]) => ({ payload }),
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
