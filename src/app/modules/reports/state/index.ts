import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app-state';
import { ReportState } from '../models/report-state';

export interface AppState extends fromRoot.AppState {
  report: ReportState;
}

const getReportFeatureState = createFeatureSelector<ReportState>('report');

export const getLiveTransit = createSelector(
  getReportFeatureState,
  (state: ReportState) => state.liveTransits,
);

export const getFrozenTransit = createSelector(
  getReportFeatureState,
  (state: ReportState) => state.frozenTransits,
);

export const getStockInputReport = createSelector(
  getReportFeatureState,
  (state: ReportState) => state.stockInput,
);
