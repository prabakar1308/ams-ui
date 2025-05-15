export interface CreateHarvest {
  worksheetId: number;
  count: number | string;
  countInStock?: number;
  unitId: number;
  measuredBy: number;
  restockCount?: number | string;
  restockUnitId?: number;
  statusId: number;
  unitSectorId?: number;
  transitCount?: number | string;
}

export interface CreateHarvestRequest {
  harvests: CreateHarvest[];
}
