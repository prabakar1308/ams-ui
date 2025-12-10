import { WorksheetTank } from './active-worksheet';
import { UnitDetails } from './unit-details';

export interface HarvestDetails {
  createdBy: number;
  updatedBy: string;
  id: number;
  worksheet: WorksheetTank;
  count: number;
  countInStock: number;
  unit?: UnitDetails;
  measuredBy?: { id: number; value: string };
  remarks?: string;
  status: string;
  transferStatus?: string;
  createdAt: Date;
  updatedAt: Date;
  restockCount?: number;
  restockStatus?: string;
  generatedAt?: Date;
}
