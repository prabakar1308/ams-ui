import { WorksheetDetails } from "@modules/worksheet/models/worksheet-detaills";

export interface DashboardState {
  tankNumber: number;
  worksheet: WorksheetDetails;
  meta: {
    isLoading: boolean;
    error: string;
  };
}
