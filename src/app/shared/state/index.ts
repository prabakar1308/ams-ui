import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SharedState } from '@app/shared/models/shared-state';
import * as fromRoot from '../../state/app-state';

export interface AppState extends fromRoot.AppState {
  shared: SharedState;
}

const getSharedFeatureState = createFeatureSelector<SharedState>('shared');

export const getWorksheetStatus = createSelector(
  getSharedFeatureState,
  (state: SharedState) => state.worksheetStatus,
);

export const getHarvestTypes = createSelector(
  getSharedFeatureState,
  (state: SharedState) => state.harvestTypes,
);

export const getUserData = createSelector(
  getSharedFeatureState,
  (state: SharedState) => state.userDetails,
);

export const getMetaInfo = createSelector(
  getSharedFeatureState,
  (state: SharedState) => state.meta,
);

export const getWorksheetFilter = createSelector(
  getSharedFeatureState,
  (state: SharedState) => state.worksheetFilter,
);

export const getMasterData = createSelector(getSharedFeatureState, (state: SharedState) => ({
  harvestTypes: state.harvestTypes,
  tankTypes: state.tankTypes,
  units: state.units,
  ph: state.ph,
  salnity: state.salnity,
  temperature: state.temperature,
  unitSectors: state.unitSectors,
  worksheetUnits: state.worksheetUnits,
}));

export const resetUserUpdated = createSelector(getSharedFeatureState, (state: SharedState) => {
  return state.meta.userUpdated || false;
});
