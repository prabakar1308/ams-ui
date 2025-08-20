export interface TransitReport {
  unitSector: { id: number; name: string; location: string };
  totalTransitCount: number;
  millions: number;
  frozenCups: number;
  shifts: {
    dayShift: {
      totalTransitCount: number;
      transits: Transit[];
    };
    nightShift: {
      totalTransitCount: number;
      transits: Transit[];
    };
  };
}

export interface Transit {
  id: number;
  generatedAt: Date;
  createdBy: string;
  harvestCount: string;
  transitCount: string;
  staffInCharge?: string;
  unitSector: {
    id?: number;
    name?: string;
    location?: string;
  };
  worksheet?: {
    tankNumber: number;
    tankType: string;
  };
}
