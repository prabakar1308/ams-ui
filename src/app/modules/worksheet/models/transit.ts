export interface Transit {
  id: number;
  harvestId?: number;
  createdAt: Date;
  createdBy: string;
  createdById?: number;
  harvestCount: string;
  transitCount: string;
  count?: number;
  countInStock?: number;
  staffInCharge?: string;
  unitId?: number;
  unitName?: string;
  unitSector: {
    id: number;
    name?: string;
    location?: string;
  };
  generatedAt?: Date;
}

export interface TransitUpdate {
  id: number;
  count: number;
  staffInCharge?: string;
  unitSectorId?: number;
  countInStock?: number;
  harvestId?: number;
  isDelete?: boolean;
  generatedAt?: Date;
}

export interface TransitPayload {
  days: number;
}
