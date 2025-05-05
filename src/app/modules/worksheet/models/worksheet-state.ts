import { WorksheetTank } from './active-worksheet';
import { TankSelection } from './create-worksheet';

export interface WorksheetState {
  activeWorksheets: WorksheetTank[];
  createWorksheet: TankSelection;
  meta: {
    isLoading: boolean;
    error: string;
  };
}
