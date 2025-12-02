import { WorksheetTank } from './active-worksheet';
import { TankSelection, UpdateWorksheet } from './create-worksheet';
import { HarvestConversionLog } from './harvest-conversion-logs';
import { HarvestDetails } from './harvest-details';
import { MonitoringCount } from './monitoring-count';
import { ActiveRestock } from './restock';
import { Transit } from './transit';

export interface WorksheetState {
  currentWorksheet: UpdateWorksheet | null;
  activeWorksheets: WorksheetTank[];
  createWorksheet: TankSelection;
  activeRestocks: ActiveRestock[];
  transits: Transit[];
  harvestData: { data: HarvestDetails[]; totalRecords: number };
  currentHarvest: HarvestDetails | null;
  meta: {
    isLoading: boolean;
    error: string;
  };
  monitoringCount: MonitoringCount;
  harvestConversionLogs: HarvestConversionLog[];
}
