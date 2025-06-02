import { HarvestDetails } from './harvest-details';
import { UnitDetails } from './unit-details';
import { UnitSector } from './unit-sector';

export interface TransitDetail {
  harvestId: number;
  unitSectorId: number;
  count: number;
  unitId: number;
  staffInCharge: string;
}

export interface CreateTransitRequest {
  transits: TransitDetail[];
  harvestId: number;
}

export interface CreateTransitResponse {
  createdBy: number;
  updatedBy: number;
  id: number;
  harvest: HarvestDetails;
  unitSector: UnitSector;
  count: number;
  unit: UnitDetails;
  staffInCharge: string;
  createdAt: Date;
  updatedAt: Date;
}
