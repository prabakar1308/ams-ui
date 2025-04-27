import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SharedFacadeService } from "@shared/service/shared-facade.service";
import { SharedService } from "@shared/service/shared-service";
import { getUserFailure, getUserSuccess } from "./shared-actions";

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private sharedService = inject(SharedService);
  private sharedFacadeService = inject(SharedFacadeService);
  
  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Dashboard] Load User Details'), // Replace with the actual action type
      exhaustMap(() =>
        this.sharedService.getUserData().pipe(
          map((res: any) => {
            console.log('user res', res);
            if (res.status !== 200) {
              return getUserFailure({ error: res.message || 'Get User Details failed' });
            }
            const userDerails = res.data.data;
            if (userDerails) {
             
                localStorage.setItem('userDerails', JSON.stringify(userDerails));
                this.sharedFacadeService.userSubject.next(userDerails);
              
              return getUserSuccess(userDerails);
            }
            return getUserFailure({ error: res.message || 'Get user details failed' });
          }),
          catchError((error) => of(getUserFailure({ error })))
        )
      )
    )
  );
}
