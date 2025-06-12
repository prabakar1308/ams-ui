import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../state';
import * as reportActions from '../state/report.actions';
import { TransitRequest } from '../models/transit-request';
import { TransitReport } from '../models/transit-response';
import { StockInput, StockInputRequest } from '../models/stock-input';

@Injectable({
  providedIn: 'root',
})
export class ReportFacadeService {
  liveTransitReport$: Observable<TransitReport[]>;
  frozenTransitReport$: Observable<TransitReport[]>;
  stockInputReport$: Observable<StockInput>;
  constructor(private store: Store<fromStore.AppState>) {
    this.liveTransitReport$ = this.store.select(fromStore.getLiveTransit);
    this.frozenTransitReport$ = this.store.select(fromStore.getFrozenTransit);
    this.stockInputReport$ = this.store.select(fromStore.getStockInputReport);
  }

  getLiveTransitReport(payload: TransitRequest) {
    this.store.dispatch(reportActions.getLiveTransitReport(payload));
  }

  getFrozenTransitReport(payload: TransitRequest) {
    this.store.dispatch(reportActions.getFrozenTransitReport(payload));
  }

  getStockInputReport(payload: StockInputRequest) {
    this.store.dispatch(reportActions.getStockInputReport(payload));
  }
}
