import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from "@angular/router";
import { SharedFacadeService } from "@shared/service/shared-facade.service";
import { SharedService } from "@shared/service/shared-service";
import { getStatusFailure, getStatusSuccess, getUserFailure, getUserSuccess } from "./shared-actions";

@Injectable()
export class SharedEffects {
  private actions$ = inject(Actions);
  private sharedService = inject(SharedService);
  private sharedFacadeService = inject(SharedFacadeService);

  getStatusData$ = createEffect(() =>
      this.actions$.pipe(
        ofType('[Dashboard] Load Status Details'), // Replace with the actual action type
        exhaustMap(() =>
          this.sharedService.getStatusData().pipe(
            map((res: any) => {
              console.log('res', res);
              if (res.status !== 200) {
                return getStatusFailure({ error: res.message || 'Get status details failed' });
              }
              const statusData = res.data;
              if (statusData) {
               // if (statusData) {
                  localStorage.setItem('statusData', JSON.stringify(statusData));
                  this.sharedFacadeService.statusSubject.next(statusData);
               // }
                return getStatusSuccess(statusData);
              }
              return getStatusFailure({ error: res.message || 'Get status details failed' });
            }),
            // TODO: this is not working, handled in component
           // tap(() => this.router.navigate(['/master'])),
            catchError((error) => of(getStatusFailure({ error })))
          )
        )
      )
    );

  }
