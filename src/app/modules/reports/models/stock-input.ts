export interface StockTankType {
  tankTypeId: number;
  tankTypeName: string;
  inputUnits: StockInputUnit[];
}

export interface StockInputUnit {
  id: number;
  name: string;
  brand: string;
  spec: string;
  count: number;
}

export interface StockInput {
  byTankType: StockTankType[];
  overall: StockInputUnit[];
}

export interface StockInputRequest {
  startDate: string;
  endDate: string;
}
