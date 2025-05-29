import { WorksheetTank } from './active-worksheet';
import { TankSelection } from './create-worksheet';
import { ActiveRestock } from './restock';
import { Transit } from './transit';

export interface WorksheetState {
  activeWorksheets: WorksheetTank[];
  createWorksheet: TankSelection;
  activeRestocks: ActiveRestock[];
  transits: Transit[];
  meta: {
    isLoading: boolean;
    error: string;
  };
}
