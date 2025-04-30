import { UserDetails } from './user-details';
import { WorksheetStatus } from './worksheet-status';

export interface SharedState {
  worksheetStatus: WorksheetStatus[];
  userDetails: UserDetails[];
  worksheetFilter: WorksheetFilter;
  meta: {
    isLoading: boolean;
    error: string;
  };
}

export interface WorksheetFilter {
  userId?: number;
  statusId?: number;
  tankTypeId?: number;
}
