import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app-state';
import { WorksheetState } from '../models/worksheet-state';
import { HarvestState } from '../models/harvest-state';

export interface AppState extends fromRoot.AppState {
  worksheet: WorksheetState;
}

const getWorksheetFeatureState = createFeatureSelector<WorksheetState>('worksheet');

export const getCurrentWorksheet = createSelector(
  getWorksheetFeatureState,
  (state: WorksheetState) => state.currentWorksheet,
);

export const getActiveWorksheets = createSelector(
  getWorksheetFeatureState,
  (state: WorksheetState) => state.activeWorksheets,
);

export const getActiveRestocks = createSelector(
  getWorksheetFeatureState,
  (state: WorksheetState) => state.activeRestocks,
);

export const getWorksheetTankDetails = createSelector(
  getWorksheetFeatureState,
  (state: WorksheetState) => state.createWorksheet,
);

// transits
export const getTransits = createSelector(
  getWorksheetFeatureState,
  (state: WorksheetState) => state.transits,
);

export const getMetaInfo = createSelector(getWorksheetFeatureState, (state) => state.meta);

export const getHarvestList = createSelector(
  getWorksheetFeatureState,
  (state: WorksheetState) => state.harvestList,
);
