import { WorksheetDetails } from '../../worksheet/models/worksheet-details';

export interface DashboardResponse {
  tankNumber: number;
  worksheet: WorksheetDetails;
}

export interface TankWiseStatus {
  id: number;
  name: string;
  value: number;
  description?: string;
}

export interface ProductionCount {
  liveAvailable: number;
  frozenAvailable: number;
  liveCompleted: number;
  frozenCompleted: number;
  restock: number;
  instockMachinery: InStockResponse[];
  instockConventional: InStockResponse[];
}

export interface InStockResponse {
  inputUnitId: number;
  inputUnitName: string;
  totalInputCount: number;
}
