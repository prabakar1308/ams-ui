import { UserDetails } from './user-details';
import { WorksheetStatus } from './worksheet-status';

export interface SharedState {
  worksheetStatus: WorksheetStatus[];
  userDetails: UserDetails[];
  meta: {
    isLoading: boolean;
    error: string;
  };
}
