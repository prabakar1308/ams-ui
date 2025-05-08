export interface TankSelection {
  tankType?: number;
  tanks: number[];
}

export interface CreateWorksheetRequest {
  harvestHours: number;
  harvestTypeId: number;
  inputCount: number;
  inputUnitId: number;
  ph: number;
  salnity: number;
  tankTypeId: number;
  temperature: number;
  userId: number;
  statusId?: number;
  tanks: number[];
}

export interface UpdateWorksheet {
  harvestHours?: number;
  harvestTypeId?: number;
  inputCount?: number;
  inputUnitId?: number;
  ph?: number;
  salnity?: number;
  tankTypeId?: number;
  temperature?: number;
  userId?: number;
  tankNumber?: number;
  statusId?: number;
  id?: number;
}

export interface UpdateWorksheetRequest {
  worksheets: UpdateWorksheet[];
  updateAction: string;
}
