import { WorksheetDetails } from '@app/worksheet/models/worksheet-details';
import { ProductionCount } from './dashboard-response';

export interface DashboardState {
  productionCount: ProductionCount;
  production: any;
  meta: {
    isLoading: boolean;
    error: string;
  };
}
