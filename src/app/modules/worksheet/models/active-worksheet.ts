import { WorksheetDetails } from './worksheet-details';

export interface ActiveWorksheet {
  tankNumber: number;
  worksheet: WorksheetDetails;
}

export interface ActiveWorksheetRequest {
  userId?: number;
  tankTypeId?: number;
  statusId?: number;
}
