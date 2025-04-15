import { createAction } from '@ngrx/store';

export const saveWorksheet = createAction(
  '[Worksheet] Save Worksheet',
  (payload: any) => ({ payload })
);

export const saveWorksheetSuccess = createAction(
  '[Worksheet] Save Worksheet Success',
  (payload: any) => ({ payload })
);
