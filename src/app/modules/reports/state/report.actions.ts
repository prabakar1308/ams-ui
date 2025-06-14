import { createAction } from '@ngrx/store';
import { TransitReport } from '../models/transit-response';
import { TransitRequest } from '../models/transit-request';
import { StockInput, StockInputRequest } from '../models/stock-input';

export const getLiveTransitReport = createAction(
  '[Report] Get Live Transit Report',
  (payload: TransitRequest) => ({ payload }),
);

export const getFrozenTransitReport = createAction(
  '[Report] Get Frozen Transit Report',
  (payload: TransitRequest) => ({ payload }),
);

export const updateLiveTransitReport = createAction(
  '[Report] Update Live Transit Report',
  (payload: TransitReport[]) => ({ payload }),
);

export const updateFrozenTransitReport = createAction(
  '[Report] Update Frozen Transit Report',
  (payload: TransitReport[]) => ({ payload }),
);

export const getTransitReportFailure = createAction(
  '[Report] Get Transit Report Failure',
  (payload: { error: string }) => ({ payload }),
);

export const getStockInputReport = createAction(
  '[Report] Get Stock Input Report',
  (payload: StockInputRequest) => ({ payload }),
);

export const getStockInputReportSuccess = createAction(
  '[Report] Get Stock Input Report Success',
  (payload: StockInput) => ({ payload }),
);

export const getStockInputReportFailure = createAction(
  '[Report] Get Stock Input Report Failure',
  (payload: { error: string }) => ({ payload }),
);

export const getActiveStockInputReport = createAction('[Report] Get Active Stock Input Report');
export const getActiveStockInputReportSuccess = createAction(
  '[Report] Get Active Stock Input Report Success',
  (payload: StockInput) => ({ payload }),
);
export const getActiveStockInputReportFailure = createAction(
  '[Report] Get Active Stock Input Report Failure',
  (payload: { error: string }) => ({ payload }),
);
