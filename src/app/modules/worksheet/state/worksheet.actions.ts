import { createAction } from '@ngrx/store';
import { WorksheetTank } from '../models/active-worksheet';
import { HarvestFilter, WorksheetFilter } from '@app/shared/models/shared-state';
import {
  CreateWorksheetRequest,
  TankSelection,
  UpdateWorksheet,
  UpdateWorksheetRequest,
} from '../models/create-worksheet';
import { ActiveRestock } from '../models/restock';
import { CreateHarvest, CreateHarvestRequest } from '../models/create-harvest';
import { Transit, TransitPayload, TransitUpdate } from '../models/transit';
import { HarvestDetails } from '../models/harvest-details';
import { CreateTransitRequest, CreateTransitResponse } from '../models/create-transit';
import { MonitoringCount } from '../models/monitoring-count';

export const getActiveWorksheets = createAction(
  '[Worksheet] Get Active Worksheets',
  (payload: WorksheetFilter) => ({ payload }),
);

export const getCurrentWorksheet = createAction(
  '[Worksheet] Get Current Worksheet',
  (payload: number) => ({ payload }),
);

export const getCurrentWorksheetSucess = createAction(
  '[Worksheet] Get Current Worksheet Success',
  (payload: UpdateWorksheet) => ({ payload }),
);

export const resetCurrentWorksheet = createAction('[Worksheet] Reset Current Worksheet');

export const getCurrentWorksheetFailure = createAction(
  '[Worksheet] Get Current Worksheet Failure',
  (payload: { error: string }) => ({ payload }),
);

export const getActiveWorksheetsSuccess = createAction(
  '[Worksheet] Get Active Worksheets Success',
  (payload: WorksheetTank[]) => ({ payload }),
);

export const getActiveWorksheetsFailure = createAction(
  '[Worksheet] Get Active Worksheets Failure',
  (payload: { error: string }) => ({ payload }),
);

export const createWorksheet = createAction(
  '[Worksheet] Create Worksheet',
  (payload: CreateWorksheetRequest) => ({
    payload,
  }),
);

export const createWorksheetSuccess = createAction(
  '[Worksheet] Create Worksheet Success',
  (payload: WorksheetTank[]) => ({ payload }),
);

export const createWorksheetFailure = createAction(
  '[Worksheet] Create Worksheet Failure',
  (payload: { error: string }) => ({ payload }),
);

export const updateWorksheets = createAction(
  '[Worksheet] Update Worksheets',
  (payload: UpdateWorksheetRequest) => ({
    payload,
  }),
);

export const updateWorksheetFailure = createAction(
  '[Worksheet] Update Worksheet Failure',
  (payload: { error: string }) => ({ payload }),
);

export const updateWorksheetTankDetails = createAction(
  '[Worksheet] Update Worksheet Tank Details',
  (payload: TankSelection) => ({ payload }),
);

export const updateWorksheetParams = createAction(
  '[Worksheet] Update Worksheet Params',
  (payload: UpdateWorksheet) => ({
    payload,
  }),
);

export const updateWorksheetParamsFailure = createAction(
  '[Worksheet] Update Worksheet Params Failure',
  (payload: { error: string }) => ({ payload }),
);

// Restock
export const getActiveRestocks = createAction(
  '[Restock] Get Active Restocks',
  (payload: string) => ({ payload }),
);

export const getActiveRestocksSuccess = createAction(
  '[Worksheet] Get Active Restocks Success',
  (payload: ActiveRestock[]) => ({ payload }),
);

export const getActiveRestocksFailure = createAction(
  '[Worksheet] Get Active Restocks Failure',
  (payload: { error: string }) => ({ payload }),
);

// Harvests
export const getHarvests = createAction('[Harvest] Get Harvests', (payload: HarvestFilter) => ({
  payload,
}));

export const getHarvestsSuccess = createAction(
  '[Harvest] Get Harvests Success',
  (payload: { data: HarvestDetails[]; totalRecords: number }) => ({ payload }),
);

export const getHarvestsFailure = createAction(
  '[Harvest] Get Harvests Failure',
  (payload: { error: string }) => ({ payload }),
);

export const getCurrentHarvest = createAction(
  '[Harvest] Get Current Harvests',
  (payload: number) => ({
    payload,
  }),
);

export const getCurrentHarvestSuccess = createAction(
  '[Harvest] Get Current Harvest Success',
  (payload: HarvestDetails) => ({ payload }),
);

export const getCurrentHarvestFailure = createAction(
  '[Harvest] Get Current Harvest Failure',
  (payload: { error: string }) => ({ payload }),
);

export const createHarvest = createAction(
  '[Harvest] Create Harvest',
  (payload: CreateHarvestRequest) => ({
    payload,
  }),
);

export const createHarvestSuccess = createAction(
  '[Harvest] Create Harvest Success',
  (payload: WorksheetTank[]) => ({ payload }),
);

export const createHarvestFailure = createAction(
  '[Harvest] Create Harvest Failure',
  (payload: { error: string }) => ({ payload }),
);

export const updateHarvest = createAction('[Harvest] Update Harvest', (payload: CreateHarvest) => ({
  payload,
}));

export const updateHarvestSuccess = createAction(
  '[Harvest] Update Harvest Success',
  // (payload: WorksheetTank[]) => ({ payload }),
);

export const updateHarvestFailure = createAction(
  '[Harvest] Update Harvest Failure',
  (payload: { error: string }) => ({ payload }),
);

// transits

export const getTransits = createAction('[Harvest] Get Transits', (payload: TransitPayload) => ({
  payload,
}));

export const getTransitsSuccess = createAction(
  '[Harvest] Get Transits Success',
  (payload: Transit[]) => ({ payload }),
);

export const getTransitsFailure = createAction(
  '[Harvest] Get Transits Failure',
  (payload: { error: string }) => ({ payload }),
);

export const createTransit = createAction(
  '[Transit] Create Transit',
  (payload: CreateTransitRequest) => ({
    payload,
  }),
);

export const createTransitSuccess = createAction(
  '[Transit] Create Transit Success',
  (payload: CreateTransitResponse[]) => ({ payload }),
);

export const createTransitFailure = createAction(
  '[Transit] Create Transit Failure',
  (payload: { error: string }) => ({ payload }),
);

export const updateTransit = createAction(
  '[Transit] Update Transit',
  (request: { payload: TransitUpdate; days: number }) => ({
    request,
  }),
);

export const updateTransitSuccess = createAction(
  '[Transit] Update Transit Success',
  // (payload: WorksheetTank[]) => ({ payload }),
);

export const updateTransitFailure = createAction(
  '[Transit] Update Transit Failure',
  (payload: { error: string }) => ({ payload }),
);

export const getMonitoringCount = createAction('[Monitoring] Get Monitoring Count');

export const getMonitoringCountSuccess = createAction(
  '[Monitoring] Get Monitoring Count Success',
  (payload: MonitoringCount) => ({ payload }),
);

export const getMonitoringCountFailure = createAction(
  '[Monitoring] Get Monitoring Count Failure',
  (payload: { error: string }) => ({ payload }),
);

export const getHarvestConversionLogs = createAction('[Harvest] Get Harvest Conversion Logs');

export const getHarvestConversionLogsSuccess = createAction(
  '[Harvest] Get Harvest Conversion Logs Success',
  (payload: any[]) => ({ payload }),
);

export const getHarvestConversionLogsFailure = createAction(
  '[Harvest] Get Harvest Conversion Logs Failure',
  (payload: { error: string }) => ({ payload }),
);
