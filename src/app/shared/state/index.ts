import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SharedState } from '@shared/models/shared-state';
import * as fromRoot from '../../state/app-state';

export interface AppState extends fromRoot.AppState {
  shared: SharedState;
}

const getSharedFeatureState = createFeatureSelector<SharedState>('shared');

export const getWorksheetStatus = createSelector(
  getSharedFeatureState,
  (state: SharedState) => state.worksheetStatus,
);
export const getUserData = createSelector(
  getSharedFeatureState,
  (state: SharedState) => state.userDetails,
);
export const getMetaInfo = createSelector(
  getSharedFeatureState,
  (state: SharedState) => state.meta,
);
