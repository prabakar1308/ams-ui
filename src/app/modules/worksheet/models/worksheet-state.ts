import { ActiveWorksheet } from './active-worksheet';
import { WorksheetDetails } from './worksheet-details';

export interface WorksheetState {
  activeWorksheets: ActiveWorksheet[];
  meta: {
    isLoading: boolean;
    error: string;
  };
}
