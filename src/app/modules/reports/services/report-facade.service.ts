import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../state';
import * as reportActions from '../state/report.actions';
import { TransitRequest } from '../models/transit-request';
import { TransitReport } from '../models/transit-response';

@Injectable({
  providedIn: 'root',
})
export class ReportFacadeService {
  transitReport$: Observable<TransitReport[]>;
  constructor(private store: Store<fromStore.AppState>) {
    this.transitReport$ = this.store.select(fromStore.getTransitReportByUnitSector);
  }

  getTransitReport(payload: TransitRequest) {
    this.store.dispatch(reportActions.getTransitReport(payload));
  }
}
