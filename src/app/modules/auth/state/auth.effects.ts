import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { userLoginSuccess, userLoginFailure, userLogin } from '../state/auth.actions';
import { AuthService } from '../services/auth.service';
import { Response } from '@app/shared/models/response';
import { AuthResponse } from '../models/auth-response';
import { AuthFacadeService } from '../services/auth-facade.service';
import { NotificationService } from '@app/core/services/notification.service';
import { SEVERITY } from '@app/core/core.contants';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private authFacadeService = inject(AuthFacadeService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogin.type),
      exhaustMap(({ payload: { userId, password } }) =>
        this.authService.login(userId, password).pipe(
          map((res: Response<AuthResponse>) => {
            if (res.status !== 200) {
              return userLoginFailure({ error: res.message || 'Login failed' });
            }
            const userData = res.data;
            if (userData) {
              if (userData) {
                localStorage.setItem('userData', JSON.stringify(userData));
                this.authFacadeService.userSubject.next(userData);
                this.notificationService.showMessage(SEVERITY.SUCCESS, 'Login is successfull!');
              }
              return userLoginSuccess(userData);
            }
            return userLoginFailure({ error: 'Login failed' });
          }),
          // TODO: this is not working, handled in component
          tap(() => this.router.navigate(['/dashboard'])),
          catchError((error) => of(userLoginFailure({ error }))),
        ),
      ),
    ),
  );

  //   loginSuccess$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType('[Auth] User Login Success'),
  //         tap(() => {
  //           console.log('Login successful!');
  //           this.router.navigate(['/master']);
  //         })
  //       ),
  //     { dispatch: false }
  //   );
}
