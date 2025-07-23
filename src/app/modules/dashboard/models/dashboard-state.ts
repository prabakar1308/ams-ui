import { WorksheetDetails } from '@app/worksheet/models/worksheet-details';
import { ProductionCount } from './dashboard-response';
import { DashboardTank } from './dashboard-tank';

export interface DashboardState {
  productionCount: ProductionCount;
  production: any;
  machineryTanks: DashboardTank[];
  conventionalTanks: DashboardTank[];
  meta: {
    isLoading: boolean;
    error: string;
  };
}
