export interface HarvestType {
  id: number;
  value: string;
  description: string;
  harvestTime: number;
}

// ph, salnity, temp, tank
export interface MasterRange {
  id: number;
  min: number;
  max: number;
  defaultValue?: number;
  step?: number;
  unitName?: string;
}

// tank type, unit
export interface MasterGeneric {
  id: number;
  value: string;
  description: string;
  limit?: number;
}

export interface UnitSector {
  id: number;
  name: string;
  description: string;
  location?: string;
}

export interface WorksheetUnit {
  id: number;
  value: string;
  brand: string;
  specs?: string;
}
