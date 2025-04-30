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
