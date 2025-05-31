import { WorksheetTank } from './active-worksheet';
import { TankSelection } from './create-worksheet';
import { HarvestDetails } from './harvest-details';
import { ActiveRestock } from './restock';
import { Transit } from './transit';

export interface WorksheetState {
  activeWorksheets: WorksheetTank[];
  createWorksheet: TankSelection;
  activeRestocks: ActiveRestock[];
  transits: Transit[];
  harvestList: HarvestDetails[];
  meta: {
    isLoading: boolean;
    error: string;
  };
}
