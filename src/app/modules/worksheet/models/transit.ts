export interface Transit {
  id: number;
  harvestId?: number;
  createdAt: Date;
  createdBy: string;
  harvestCount: string;
  transitCount: string;
  count?: number;
  countInStock?: number;
  staffInCharge?: string;
  unitName?: string;
  unitSector: {
    id: number;
    name?: string;
    location?: string;
  };
}

export interface TransitUpdate {
  id: number;
  count: number;
  staffInCharge?: string;
  unitSectorId?: number;
  countInStock?: number;
  harvestId?: number;
  isDelete?: boolean;
}

export interface TransitPayload {
  days: number;
}
