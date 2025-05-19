export interface Transit {
  id: number;
  createdAt: Date;
  createdBy: string;
  harvestCount: string;
  transitCount: string;
  unitSector: {
    name?: string;
    location?: string;
  };
}

export interface TransitPayload {
  days: number;
}
