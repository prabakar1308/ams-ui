import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app-state';
import { ReportState } from '../models/report-state';

export interface AppState extends fromRoot.AppState {
  report: ReportState;
}

const getReportFeatureState = createFeatureSelector<ReportState>('report');

export const getTransitReportByUnitSector = createSelector(
  getReportFeatureState,
  (state: ReportState) => state.transitsByUnitSector,
);
