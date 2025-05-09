import { WorksheetTank } from './active-worksheet';
import { TankSelection } from './create-worksheet';
import { ActiveRestock } from './restock';

export interface WorksheetState {
  activeWorksheets: WorksheetTank[];
  createWorksheet: TankSelection;
  activeRestocks: ActiveRestock[];
  meta: {
    isLoading: boolean;
    error: string;
  };
}
