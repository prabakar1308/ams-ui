import { createReducer, on } from '@ngrx/store';

import * as ReportActions from './report.actions';
import { ReportState } from '../models/report-state';

export const initialState: ReportState = {
  liveTransits: [],
  frozenTransits: [],
  stockInput: {
    byTankType: [],
    overall: [],
  },
  activeStockInput: {
    byTankType: [],
    overall: [],
  },
  availableStockInput: [],
};

export const reportReducer = createReducer(
  initialState,
  // Handle the actions here
  on(ReportActions.updateLiveTransitReport, (state, { payload }) => ({
    ...state,
    liveTransits: payload,
  })),
  on(ReportActions.updateFrozenTransitReport, (state, { payload }) => ({
    ...state,
    frozenTransits: payload,
  })),
  on(ReportActions.getStockInputReportSuccess, (state, { payload }) => ({
    ...state,
    stockInput: payload,
  })),
  on(ReportActions.getActiveStockInputReportSuccess, (state, { payload }) => ({
    ...state,
    activeStockInput: payload,
  })),
  on(ReportActions.getAvailableStockInputReportSuccess, (state, { payload }) => ({
    ...state,
    availableStockInput: payload,
  })),
);
