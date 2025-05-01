import { WorksheetTank } from './active-worksheet';

export interface WorksheetState {
  activeWorksheets: WorksheetTank[];
  meta: {
    isLoading: boolean;
    error: string;
  };
}
