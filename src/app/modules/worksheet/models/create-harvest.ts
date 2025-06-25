export interface CreateHarvest {
  id?: number;
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
  divider?: string;
}

export interface CreateHarvestRequest {
  harvests: CreateHarvest[];
}
