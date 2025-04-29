import { WorksheetDetails } from '@modules/worksheet/models/worksheet-details';

export interface DashboardState {
  tankNumber: number;
  worksheet: WorksheetDetails;
  meta: {
    isLoading: boolean;
    error: string;
  };
}
