import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardService } from "../services/dashboard.service";
import { DashboardFacadeService } from "../services/dashboard-facade.service";
import { Router } from "@angular/router";
import { DashboardResponse } from "../models/dashboard-response";
import { loadTankDetailsFailure, getDashboardDataSuccess } from './dashboard.actions';
import { Response } from '@shared/models/response';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);
  private dashboardFacadeService = inject(DashboardFacadeService);
  private router = inject(Router);

  getActiveWorksheets$ = createEffect(() =>
      this.actions$.pipe(
        ofType('[Dashboard] Load Tank Details'), // Replace with the actual action type
        exhaustMap(({ payload: { userId, tankTypeId, statusId } }) =>
          this.dashboardService.getActiveWorksheets(userId, tankTypeId, statusId).pipe(
            map((res: any) => {
              console.log('res', res);
              if (res.status !== 201) {
                return loadTankDetailsFailure({ error: res.message || 'Get dashboard details failed' });
              }
              const dashboardData = res.data;
              if (dashboardData) {
                if (dashboardData) {
                  localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
                  this.dashboardFacadeService.dashboardSubject.next(dashboardData);
                }
                return getDashboardDataSuccess(dashboardData);
              }
              return loadTankDetailsFailure({ error: res.message || 'Get dashboard details failed' });
            }),
            // TODO: this is not working, handled in component
           // tap(() => this.router.navigate(['/master'])),
            catchError((error) => of(loadTankDetailsFailure({ error })))
          )
        )
      )
    );
}

