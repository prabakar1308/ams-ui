import { WorksheetDetails } from './worksheet-details';

export interface ActiveWorksheet {
  tankNumber: number;
  worksheet: WorksheetDetails;
}

export interface WorksheetTank {
  tankNumber: number;
  worksheetId?: number;
  tankType?: { id: number; value: string };
  harvestType?: { id: number; value: string };
  inputSource?: string;
  assignedUser?: { id: number; value: string };
  status?: { id: number; value: string };
  harvestHours?: number;
  timeDifference?: {
    text: string;
    status: string;
  };
  parameters?: WorksheetParameters[];
}

export interface WorksheetParameters {
  label: string;
  value: string;
}

export interface ActiveWorksheetRequest {
  userId?: number;
  tankTypeId?: number;
  statusId?: number;
}

// export interface ActiveWorksheetTable {
//   tankNumber: number;
//   worksheet: WorksheetDetails;
// }
