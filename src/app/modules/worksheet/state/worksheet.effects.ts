import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { WorksheetService } from '../services/worksheet.service';
import {
  getActiveWorksheets,
  getActiveWorksheetsSuccess,
  getActiveWorksheetsFailure,
  createWorksheet,
  createWorksheetFailure,
  updateWorksheets,
  updateWorksheetFailure,
  getActiveRestocks,
  getActiveRestocksFailure,
  getActiveRestocksSuccess,
  createHarvest,
  createHarvestSuccess,
  createHarvestFailure,
  getTransits,
  getTransitsFailure,
  getTransitsSuccess,
  getHarvests,
  getHarvestsFailure,
  getHarvestsSuccess,
  createTransit,
  createTransitFailure,
  createTransitSuccess,
  getCurrentWorksheet,
  getCurrentWorksheetSucess,
  getCurrentWorksheetFailure,
  updateWorksheetParams,
  updateWorksheetParamsFailure,
} from './worksheet.actions';
import { Response } from '@app/shared/models/response';
import { WorksheetTank } from '../models/active-worksheet';
import { ActiveRestock } from '../models/restock';
import { NotificationService } from '@app/core/services/notification.service';
import { SEVERITY } from '@app/core/core.contants';
import { Transit } from '../models/transit';
import { HarvestDetails } from '../models/harvest-details';
import { UpdateWorksheet } from '../models/create-worksheet';

@Injectable()
export class WorksheetEffects {
  private actions$ = inject(Actions);
  private WorksheetService = inject(WorksheetService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  getActiveWorksheets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActiveWorksheets.type),
      exhaustMap(({ payload }) =>
        this.WorksheetService.getActiveWorksheets(payload).pipe(
          map((res: Response<WorksheetTank[]>) => {
            if (res.status !== 201) {
              return getActiveWorksheetsFailure({
                error: res.message || 'Get dashboard details failed',
              });
            }
            if (res.data) {
              return getActiveWorksheetsSuccess(res.data);
            }
            return getActiveWorksheetsFailure({
              error: res.message || 'Get dashboard details failed',
            });
          }),
          catchError((error) => of(getActiveWorksheetsFailure({ error }))),
        ),
      ),
    ),
  );

  getCurrentWorksheet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentWorksheet.type),
      exhaustMap(({ payload }) =>
        this.WorksheetService.getWorksheetById(payload).pipe(
          map((res: Response<UpdateWorksheet>) => {
            if (res.status !== 201 && res.status !== 200) {
              return getCurrentWorksheetFailure({
                error: res.message || 'Get worksheet by id failed',
              });
            }
            if (res.data) {
              return getCurrentWorksheetSucess(res.data);
            }
            return getCurrentWorksheetFailure({
              error: res.message || 'Get worksheet by id failed',
            });
          }),
          catchError((error) => of(getCurrentWorksheetFailure({ error }))),
        ),
      ),
    ),
  );

  createWorksheets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createWorksheet.type),
      exhaustMap(({ payload }) =>
        this.WorksheetService.createWorksheets(payload).pipe(
          map((res: Response<WorksheetTank[]>) => {
            if (res.status !== 201) {
              return createWorksheetFailure({
                error: res.message || 'Create Worksheet failed',
              });
            }
            if (res.data) {
              this.notificationService.showMessage(
                SEVERITY.SUCCESS,
                'Worksheets are created successfully!',
              );
              return getActiveWorksheetsSuccess(res.data);
            }
            return createWorksheetFailure({
              error: res.message || 'Create Worksheet failed',
            });
          }),
          tap(() => this.router.navigate(['/worksheet'])),
          catchError((error) => of(createWorksheetFailure({ error }))),
        ),
      ),
    ),
  );

  updateWorksheets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateWorksheets.type),
      exhaustMap(({ payload }) =>
        this.WorksheetService.updateWorksheets(payload).pipe(
          map((res: Response<WorksheetTank[]>) => {
            if (res.status !== 201 && res.status !== 200) {
              return updateWorksheetFailure({
                error: res.message || 'Update Worksheet failed',
              });
            }
            if (res.data) {
              return getActiveWorksheetsSuccess(res.data);
            }
            return updateWorksheetFailure({
              error: res.message || 'Update Worksheet failed',
            });
          }),
          catchError((error) => of(updateWorksheetFailure({ error }))),
        ),
      ),
    ),
  );

  updateWorksheetParams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateWorksheetParams.type),
      exhaustMap(({ payload }) =>
        this.WorksheetService.updateWorksheetParams(payload).pipe(
          map((res: Response<WorksheetTank[]>) => {
            if (res.status !== 201 && res.status !== 200) {
              return updateWorksheetParamsFailure({
                error: res.message || 'Update Worksheet Params failed',
              });
            }
            if (res.data) {
              this.notificationService.showMessage(
                SEVERITY.SUCCESS,
                'Worksheet is updated successfully!',
              );
              return getActiveWorksheetsSuccess(res.data);
            }
            return updateWorksheetParamsFailure({
              error: res.message || 'Update Worksheet Params failed',
            });
          }),
          tap(() => this.router.navigate(['/worksheet'])),
          catchError((error) => of(updateWorksheetParamsFailure({ error }))),
        ),
      ),
    ),
  );

  //Restocks
  getActiveRestocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActiveRestocks.type),
      exhaustMap(({ payload }) =>
        this.WorksheetService.getRestocks(payload).pipe(
          map((res: Response<ActiveRestock[]>) => {
            if (res.status !== 201 && res.status !== 200) {
              return getActiveRestocksFailure({
                error: res.message || 'Get active restocks failed',
              });
            }
            if (res.data) {
              return getActiveRestocksSuccess(res.data);
            }
            return getActiveRestocksFailure({
              error: res.message || 'Get active restocks failed',
            });
          }),
          catchError((error) => of(getActiveRestocksFailure({ error }))),
        ),
      ),
    ),
  );

  // harvests

  createHarvest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createHarvest.type),
      exhaustMap(({ payload }) =>
        this.WorksheetService.createHarvest(payload).pipe(
          map((res: Response<any>) => {
            if (res.status !== 201) {
              return createHarvestFailure({
                error: res.message || 'Create harvest failed',
              });
            }
            if (res.data) {
              this.notificationService.showMessage(
                SEVERITY.SUCCESS,
                'Harvest is done successfully!',
              );
              return createHarvestSuccess(res.data);
            }
            return createHarvestFailure({
              error: res.message || 'Create harvest failed',
            });
          }),
          tap(() => this.router.navigate(['/worksheet/harvest'])),
          catchError((error) => of(createHarvestFailure({ error }))),
        ),
      ),
    ),
  );

  // Transits
  getTransits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTransits.type),
      exhaustMap(({ payload }) =>
        this.WorksheetService.getTransits(payload).pipe(
          map((res: Response<Transit[]>) => {
            if (res.status !== 201 && res.status !== 200) {
              return getTransitsFailure({
                error: res.message || 'Get transits failed',
              });
            }
            if (res.data) {
              return getTransitsSuccess(res.data);
            }
            return getTransitsFailure({
              error: res.message || 'Get transits failed',
            });
          }),
          //tap(() => this.router.navigate(['/worksheet/'])),
          catchError((error) => of(getTransitsFailure({ error }))),
        ),
      ),
    ),
  );

  getHarvestList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getHarvests.type),
      exhaustMap(({ payload: { unitId, statusIds } }) =>
        this.WorksheetService.getHarvests(unitId, statusIds).pipe(
          map((res: Response<HarvestDetails[]>) => {
            console.log('Hervest data:', res);
            if (res.status !== 201) {
              return getHarvestsFailure({
                error: res.message || 'Get Harvest details failed',
              });
            }
            if (res.data) {
              return getHarvestsSuccess(res.data);
            }
            return getHarvestsFailure({
              error: res.message || 'Get Harvest details failed',
            });
          }),
          catchError((error) => of(getHarvestsFailure({ error }))),
        ),
      ),
    ),
  );

  createTransits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTransit.type),
      exhaustMap(({ payload: { filter, ...transit } }) =>
        this.WorksheetService.createTransit(transit).pipe(
          map((res: Response<any>) => {
            if (res.status !== 201) {
              return createTransitFailure({
                error: res.message || 'Create Transit failed',
              });
            }
            if (res.data) {
              this.notificationService.showMessage(
                SEVERITY.SUCCESS,
                'Transits created successfully!',
              );
              return getHarvests(filter);
            }
            return createTransitFailure({
              error: res.message || 'Create Transit failed',
            });
          }),
          tap(() => of(getHarvests(filter))),
          catchError((error) => of(createTransitFailure({ error }))),
        ),
      ),
    ),
  );
}
