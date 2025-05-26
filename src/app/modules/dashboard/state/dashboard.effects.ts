import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { DashboardService } from '../services/dashboard.service';
import {
  getDashboardData,
  getDashboardDataFailure,
  getDashboardDataSuccess,
  getProductionData,
  getProductionDataSuccess,
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

  getProductionData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductionData.type),
      exhaustMap(() =>
        forkJoin([
          this.dashboardService.getHarvestCount(1, ['A', 'P']),
          this.dashboardService.getHarvestCount(2, ['A', 'P']),
          this.dashboardService.getTransitsCount(1, 1),
          this.dashboardService.getTransitsCount(2, 1),
          this.dashboardService.getRestockCount('A'),
          this.dashboardService.getInStockCount(1),
          this.dashboardService.getInStockCount(2),
        ]).pipe(
          map((response) => {
            let isError = false;
            response.forEach((res) => {
              if (res.status !== 200 && res.status !== 201) {
                isError = true;
              }
            });

            const [
              liveAvailableRes,
              frozenAvailableRes,
              liveCompletedRes,
              frozenCompletedRes,
              restockRes,
              instockMachineryRes,
              instockConventionalRes,
            ] = response;
            if (isError) {
              return getDashboardDataFailure({
                error: 'Get Master Data failed1',
              });
            } else {
              const liveAvailable = liveAvailableRes.data;
              const frozenAvailable = frozenAvailableRes.data;
              const liveCompleted = liveCompletedRes.data;
              const frozenCompleted = frozenCompletedRes.data;
              const restock = restockRes.data;
              const instockMachinery = instockMachineryRes.data;
              const instockConventional = instockConventionalRes.data;
              return getProductionDataSuccess({
                liveAvailable,
                frozenAvailable,
                frozenCompleted,
                liveCompleted,
                restock,
                instockMachinery,
                instockConventional,
              });
            }
            // return getUsersListFailure({ error: 'Get user details failed' });
          }),
          catchError((error) => of(getDashboardDataFailure({ error }))),
        ),
      ),
    ),
  );
}
