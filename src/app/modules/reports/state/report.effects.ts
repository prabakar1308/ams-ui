import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import {
  getFrozenTransitReport,
  getLiveTransitReport,
  getStockInputReport,
  getStockInputReportFailure,
  getStockInputReportSuccess,
  getTransitReportFailure,
  updateFrozenTransitReport,
  updateLiveTransitReport,
} from './report.actions';
import { Response } from '@app/shared/models/response';
import { NotificationService } from '@app/core/services/notification.service';
import { ReportService } from '../services/report.service';
import { TransitReport } from '../models/transit-response';
import { StockInput } from '../models/stock-input';
import { UNIT_IDS } from '@app/shared/constants/shared.contants';

@Injectable()
export class ReportEffects {
  private actions$ = inject(Actions);
  private reportService = inject(ReportService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  // Transits
  getLiveTransitsReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLiveTransitReport.type),
      exhaustMap(({ payload }) =>
        this.reportService.getTransitReport(payload).pipe(
          map((res: Response<TransitReport[]>) => {
            if (res.status !== 201 && res.status !== 200) {
              return getTransitReportFailure({
                error: res.message || 'Get transits report failed',
              });
            }
            if (res.data) {
              // Dispatch both updateLiveTransitReport and getFrozenTransitReport
              return [
                updateLiveTransitReport(res.data),
                getFrozenTransitReport({ ...payload, unitId: UNIT_IDS.FROZEN_CUPS }),
              ];
            }
            return getTransitReportFailure({
              error: res.message || 'Get transits report failed',
            });
          }),
          // Flatten the array of actions if needed
          exhaustMap((actions) => (Array.isArray(actions) ? actions : [actions])),
          catchError((error) => of(getTransitReportFailure({ error }))),
        ),
      ),
    ),
  );

  getFrozenTransitsReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFrozenTransitReport.type),
      exhaustMap(({ payload }) =>
        this.reportService.getTransitReport(payload).pipe(
          map((res: Response<TransitReport[]>) => {
            if (res.status !== 201 && res.status !== 200) {
              return getTransitReportFailure({
                error: res.message || 'Get transits report failed',
              });
            }
            if (res.data) {
              return updateFrozenTransitReport(res.data);
            }
            return getTransitReportFailure({
              error: res.message || 'Get transits report failed',
            });
          }),
          catchError((error) => of(getTransitReportFailure({ error }))),
        ),
      ),
    ),
  );

  getStockInputReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStockInputReport.type),
      exhaustMap(({ payload }) =>
        this.reportService.getStockInputReport(payload).pipe(
          map((res: Response<StockInput>) => {
            if (res.status !== 201 && res.status !== 200) {
              return getStockInputReportFailure({
                error: res.message || 'Get stock input report failed',
              });
            }
            if (res.data) {
              return getStockInputReportSuccess(res.data);
            }
            return getStockInputReportFailure({
              error: res.message || 'Get stock input report failed',
            });
          }),
          catchError((error) => of(getStockInputReportFailure({ error }))),
        ),
      ),
    ),
  );
}
