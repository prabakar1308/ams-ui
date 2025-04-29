import { HarvestTypeDetails } from '../../../shared/models/harvestType-details';
import { WorksheetStatus } from '../../../shared/models/worksheet-status';
import { TankTypeDetails } from '../../../shared/models/tankType-details';
import { UserDetails } from '../../../shared/models/user-details';

export interface WorksheetDetails {
  createdBy: number | null;
  updatedBy: number | null;
  id: number;
  status: WorksheetStatus | null;
  ph: string | null;
  salnity: number | null;
  temperature: number | null;
  tankType: TankTypeDetails | null;
  tankNumber: number | null;
  harvestType: HarvestTypeDetails | null;
  harvestTime: Date | null;
  inputSource: string | null;
  inputCount: number | null;
  sourceUnitName: string | null;
  user: UserDetails | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  userId: string;
}
