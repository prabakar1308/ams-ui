import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SharedService } from '@shared/service/shared-service';
import {
  getWorksheetStatusSuccess,
  getWorksheetStatusFailure,
  getUsersListFailure,
  getUsersListSuccess,
} from './shared-actions';
import { Response } from '@shared/models/response';
import { WorksheetStatus } from '@shared/models/worksheet-status';
import { UserDetails } from '@shared/models/user-details';

@Injectable()
export class SharedEffects {
  private actions$ = inject(Actions);
  private sharedService = inject(SharedService);

  getWorksheetStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Shared] Get Worksheet Status'),
      exhaustMap(() =>
        this.sharedService.getWorksheetStatus().pipe(
          map((res: Response<WorksheetStatus[]>) => {
            if (res.status !== 200) {
              return getWorksheetStatusFailure({
                error: res.message || 'Get status details failed',
              });
            }

            if (res.data) {
              return getWorksheetStatusSuccess(res.data);
            }
            return getWorksheetStatusFailure({
              error: res.message || 'Get worksheet status details failed',
            });
          }),
          catchError((error) => of(getWorksheetStatusFailure({ error }))),
        ),
      ),
    ),
  );

  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Shared] Get Users List'), // Replace with the actual action type
      exhaustMap(() =>
        this.sharedService.getUserData().pipe(
          map((res: Response<{ data: UserDetails[] }>) => {
            console.log('user res', res);
            if (res.status !== 200) {
              return getUsersListFailure({ error: res.message || 'Get User Details failed' });
            }
            if (res.data.data) {
              return getUsersListSuccess(res.data.data);
            }
            return getUsersListFailure({ error: res.message || 'Get user details failed' });
          }),
          catchError((error) => of(getUsersListFailure({ error }))),
        ),
      ),
    ),
  );
}
