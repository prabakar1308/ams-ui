import { HarvestType, MasterGeneric, MasterRange, UnitSector, WorksheetUnit } from './master';
import { UserDetails } from './user-details';
import { WorksheetStatus } from './worksheet-status';

export interface SharedState {
  worksheetStatus: WorksheetStatus[];
  userDetails: UserDetails[];
  worksheetFilter: WorksheetFilter;
  harvestTypes: HarvestType[];
  tankTypes: MasterGeneric[];
  units: MasterGeneric[];
  worksheetUnits: WorksheetUnit[];
  ph: MasterRange;
  salnity: MasterRange;
  temperature: MasterRange;
  unitSectors: UnitSector[];
  meta: {
    isLoading: boolean;
    error: string;
  };
}

export interface WorksheetFilter {
  userId?: number;
  statusId?: number;
  tankTypeId?: number;
}

export interface MasterData {
  harvestTypes: HarvestType[];
  tankTypes: MasterGeneric[];
  units: MasterGeneric[];
  ph: MasterRange;
  salnity: MasterRange;
  temperature: MasterRange;
  unitSectors: UnitSector[];
  worksheetUnits: WorksheetUnit[];
}
