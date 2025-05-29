import { createReducer, on } from '@ngrx/store';

import * as ReportActions from './report.actions';
import { ReportState } from '../models/report-state';

export const initialState: ReportState = {
  transitsByUnitSector: [],
};

export const reportReducer = createReducer(
  initialState,
  // Handle the actions here
  on(ReportActions.getTransitReportSuccess, (state, { payload }) => ({
    ...state,
    transitsByUnitSector: payload,
  })),
);
