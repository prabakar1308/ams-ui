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
  tanks: number[];
}
