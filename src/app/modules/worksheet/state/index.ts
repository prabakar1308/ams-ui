import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app-state';
import { WorksheetState } from '../models/worksheet-state';

export interface AppState extends fromRoot.AppState {
  worksheet: WorksheetState;
}

const getWorksheetFeatureState = createFeatureSelector<WorksheetState>('worksheet');

export const getActiveWorksheets = createSelector(
  getWorksheetFeatureState,
  (state: WorksheetState) => state.activeWorksheets,
);

export const getWorksheetTankDetails = createSelector(
  getWorksheetFeatureState,
  (state: WorksheetState) => state.createWorksheet,
);

export const getMetaInfo = createSelector(getWorksheetFeatureState, (state) => state.meta);
