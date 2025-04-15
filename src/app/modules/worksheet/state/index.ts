import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app-state';
import { WorksheetState } from '../models/worksheet-state';

export interface AppState extends fromRoot.AppState {
  worksheet: WorksheetState;
}

const getWorksheetFeatureState =
  createFeatureSelector<WorksheetState>('worksheet');

export const getWorksheet = createSelector(
  getWorksheetFeatureState,
  (state) => state.worksheet
);

export const getMetaInfo = createSelector(
  getWorksheetFeatureState,
  (state) => state.meta
);
