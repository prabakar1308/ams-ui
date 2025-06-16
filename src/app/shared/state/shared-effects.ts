import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { SharedService } from '@app/shared/service/shared-service';
import {
  getWorksheetStatusSuccess,
  getWorksheetStatusFailure,
  getUsersListFailure,
  getUsersListSuccess,
  getMasterData,
  getMasterDataFailure,
  getMasterDataSuccess,
  getUsersList,
  getWorksheetStatus,
  createUser,
  createUserFailure,
  createUserSuccess,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
} from './shared-actions';
import { Response } from '@app/shared/models/response';
import { WorksheetStatus } from '@app/shared/models/worksheet-status';
import { UserDetails } from '@app/shared/models/user-details';
import { NotificationService } from '@app/core/services/notification.service';
import { SEVERITY } from '@app/core/core.contants';

@Injectable()
export class SharedEffects {
  private actions$ = inject(Actions);
  private sharedService = inject(SharedService);
  private notificationService = inject(NotificationService);

  getWorksheetStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWorksheetStatus.type),
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
      ofType(getUsersList.type),
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

  getMasterData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMasterData.type),
      switchMap(() =>
        forkJoin([
          this.sharedService.getHarvestTypes(),
          this.sharedService.getMasterGeneric('tank-types'),
          this.sharedService.getMasterGeneric('unit'),
          this.sharedService.getMasterRange('ph'),
          this.sharedService.getMasterRange('salnity'),
          this.sharedService.getMasterRange('temperature'),
          this.sharedService.getUnitSector(),
          this.sharedService.getWorksheetUnits(),
        ]).pipe(
          map((response) => {
            let isError = false;
            response.forEach((res) => {
              if (res.status !== 200) {
                isError = true;
              }
            });

            const [
              harvestTypeRes,
              tankTypesRes,
              unitRes,
              phRes,
              salnityRes,
              tempRes,
              unitSectorRes,
              worksheetUnitRes,
            ] = response;
            if (isError) {
              return getMasterDataFailure({
                error: 'Get Master Data failed',
              });
            } else {
              const harvestTypes = harvestTypeRes.data;
              const tankTypes = tankTypesRes.data;
              const units = unitRes.data;
              const ph = phRes.data;
              const salnity = salnityRes.data;
              const temperature = tempRes.data;
              const unitSectors = unitSectorRes.data;
              const worksheetUnits = worksheetUnitRes.data;
              return getMasterDataSuccess({
                harvestTypes,
                tankTypes,
                units,
                ph,
                salnity,
                temperature,
                unitSectors,
                worksheetUnits,
              });
            }
            // return getUsersListFailure({ error: 'Get user details failed' });
          }),
          catchError((error) => of(getUsersListFailure({ error }))),
        ),
      ),
    ),
  );

  createUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser.type),
      exhaustMap(({ payload }) =>
        this.sharedService.createUser(payload).pipe(
          map((res: Response<any>) => {
            if (res.status !== 201) {
              return createUserFailure({
                error: res.message || 'Create User failed',
              });
            }
            if (res.data) {
              this.notificationService.showMessage(SEVERITY.SUCCESS, 'User created successfully!');
              return createUserSuccess(res.data);
            }
            return createUserFailure({
              error: res.message || 'Create User failed',
            });
          }),
          catchError((error) => of(createUserFailure({ error }))),
        ),
      ),
    ),
  );
  updateUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser.type),
      exhaustMap(({ payload }) =>
        this.sharedService.updateUser(payload).pipe(
          map((res: Response<any>) => {
            if (res.status !== 201) {
              return updateUserFailure({
                error: res.message || 'Update User failed',
              });
            }
            if (res.data) {
              this.notificationService.showMessage(SEVERITY.SUCCESS, 'User updated successfully!');
              return updateUserSuccess(res.data);
            }
            return updateUserFailure({
              error: res.message || 'Update User failed',
            });
          }),
          catchError((error) => of(updateUserFailure({ error }))),
        ),
      ),
    ),
  );

  deleteUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser.type),
      exhaustMap(({ payload }) =>
        this.sharedService.deleteUser(payload).pipe(
          map((res: Response<any>) => {
            if (res.status !== 201) {
              return deleteUserFailure({
                error: res.message || 'Update User failed',
              });
            }
            if (res.data) {
              this.notificationService.showMessage(SEVERITY.SUCCESS, 'User Deleted successfully!');
              return deleteUserSuccess(res.data);
            }
            return deleteUserFailure({
              error: res.message || 'Update User failed',
            });
          }),
          catchError((error) => of(deleteUserFailure({ error }))),
        ),
      ),
    ),
  );
}
