import { createAction } from '@ngrx/store';
import { WorksheetTank } from '../models/active-worksheet';
import { HarvestFilter, WorksheetFilter } from '@app/shared/models/shared-state';
import {
  CreateWorksheetRequest,
  TankSelection,
  UpdateWorksheetRequest,
} from '../models/create-worksheet';
import { ActiveRestock } from '../models/restock';
import { CreateHarvestRequest } from '../models/create-harvest';
import { Transit, TransitPayload } from '../models/transit';
import { HarvestDetails } from '../models/harvest-details';
import { CreateTransitRequest, CreateTransitResponse } from '../models/create-transit';

export const getActiveWorksheets = createAction(
  '[Worksheet] Get Active Worksheets',
  (payload: WorksheetFilter) => ({ payload }),
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

export const updateWorksheet = createAction(
  '[Worksheet] Update Worksheet',
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
  (payload: HarvestDetails[]) => ({ payload }),
);

export const getHarvestsFailure = createAction(
  '[Harvest] Get Harvests Failure',
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
  '[Harvest] Create Transit',
  (payload: CreateTransitRequest) => ({
    payload,
  }),
);

export const createTransitSuccess = createAction(
  '[Harvest] Create Transit Success',
  (payload: CreateTransitResponse[]) => ({ payload }),
);

export const createTransitFailure = createAction(
  '[Harvest] Create Transit Failure',
  (payload: { error: string }) => ({ payload }),
);
