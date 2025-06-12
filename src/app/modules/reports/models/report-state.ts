import { StockInput } from './stock-input';
import { TransitReport } from './transit-response';

export interface ReportState {
  // transitsByUnitSector: TransitReport[];
  liveTransits: TransitReport[];
  frozenTransits: TransitReport[];
  stockInput: StockInput;
}
