import { createAction } from '@ngrx/store';

export const loadTankDetails = createAction(
  '[Dashboard] Load Tank Details',
  (payload: { tankTypeId: number }) => ({ payload })
);

export const loadTankDetailsSuccess = createAction(
  '[Dashboard] Load Tank Details Success',
  (payload: { tankDetails: any[] }) => ({ payload })
);
