import { createAction } from '@ngrx/store';
import { TransitReport } from '../models/transit-response';
import { TransitRequest } from '../models/transit-request';

export const getTransitReport = createAction(
  '[Report] Get Transit Report',
  (payload: TransitRequest) => ({ payload }),
);

export const getTransitReportSuccess = createAction(
  '[Report] Get Transit Report Success',
  (payload: TransitReport[]) => ({ payload }),
);

export const getTransitReportFailure = createAction(
  '[Report] Get Transit Report Failure',
  (payload: { error: string }) => ({ payload }),
);
