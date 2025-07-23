import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { DashboardService } from '../services/dashboard.service';
import {
  getConventionalTanks,
  getConventionalTanksSuccess,
  getDashboardData,
  getDashboardDataFailure,
  getDashboardDataSuccess,
  getMachineryTanks,
  getMachineryTanksSuccess,
  getProductionData,
  getProductionDataSuccess,
  getTanksFailure,
} from './dashboard.actions';
import { TANK_TYPES } from '@app/shared/constants/shared.contants';

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
          this.dashboardService.getTransitsCount(1, 0),
          this.dashboardService.getTransitsCount(2, 0),
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

  getMachineryTanks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMachineryTanks.type),
      switchMap(() =>
        this.dashboardService.getTankListWithStatus(TANK_TYPES.MACHINERY).pipe(
          map((res) => {
            if (res.status !== 200 && res.status !== 201) {
              return getTanksFailure({
                error: res.message || 'Get machinery tanks failed',
              });
            }
            return getMachineryTanksSuccess(res.data);
          }),
          catchError((error) => of(getTanksFailure({ error }))),
        ),
      ),
    ),
  );

  getConventionalTanks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getConventionalTanks.type),
      switchMap(() =>
        this.dashboardService.getTankListWithStatus(TANK_TYPES.CONVENTIONAL).pipe(
          map((res) => {
            if (res.status !== 200 && res.status !== 201) {
              return getTanksFailure({
                error: res.message || 'Get conventional tanks failed',
              });
            }
            return getConventionalTanksSuccess(res.data);
          }),
          catchError((error) => of(getTanksFailure({ error }))),
        ),
      ),
    ),
  );
}
