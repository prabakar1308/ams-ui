import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import {
  getTransitReport,
  getTransitReportFailure,
  getTransitReportSuccess,
} from './report.actions';
import { Response } from '@app/shared/models/response';
import { NotificationService } from '@app/core/services/notification.service';
import { ReportService } from '../services/report.service';
import { TransitReport } from '../models/transit-response';

@Injectable()
export class ReportEffects {
  private actions$ = inject(Actions);
  private reportService = inject(ReportService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  // Transits
  getTransitsReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTransitReport.type),
      exhaustMap(({ payload }) =>
        this.reportService.getTransitReport(payload).pipe(
          map((res: Response<TransitReport[]>) => {
            if (res.status !== 201 && res.status !== 200) {
              return getTransitReportFailure({
                error: res.message || 'Get transits report failed',
              });
            }
            if (res.data) {
              return getTransitReportSuccess(res.data);
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
}
