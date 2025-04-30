import { WorksheetDetails } from '@modules/worksheet/models/worksheet-details';

export interface DashboardState {
  production: any;
  meta: {
    isLoading: boolean;
    error: string;
  };
}
