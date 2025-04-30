import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { DashboardService } from '../services/dashboard.service';
import {
  getDashboardData,
  getDashboardDataFailure,
  getDashboardDataSuccess,
} from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);

  getActiveWorksheets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDashboardData.type),
      exhaustMap(({ payload: { userId, tankTypeId, statusId } }) =>
        this.dashboardService.getActiveWorksheets(userId, tankTypeId, statusId).pipe(
          map((res: any) => {
            console.log('res', res);
            if (res.status !== 201) {
              return getDashboardDataFailure({
                error: res.message || 'Get dashboard details failed',
              });
            }
            if (res.data) {
              return getDashboardDataSuccess(res.data);
            }
            return getDashboardDataFailure({
              error: res.message || 'Get dashboard details failed',
            });
          }),
          catchError((error) => of(getDashboardDataFailure({ error }))),
        ),
      ),
    ),
  );
}
