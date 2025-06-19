import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Response } from '@app/shared/models/response';
import { NotificationService } from '@app/core/services/notification.service';
import { SEVERITY } from '@app/core/core.contants';

import { AuthService } from '../services/auth.service';
import { AuthFacadeService } from '../services/auth-facade.service';
import { AuthResponse } from '../models/auth-response';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private authFacadeService: AuthFacadeService,
    private notificationService: NotificationService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userData = this.authFacadeService.currentUserData;
    if (userData && userData.accessToken) {
      request = this.addToken(request, userData.accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      }),
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      let userData = this.authFacadeService.currentUserData;
      return this.authService.refreshToken(userData.refreshToken).pipe(
        switchMap((response: Response<AuthResponse>) => {
          this.isRefreshing = false;
          if (response.status !== 200) {
            return throwError(() => response.message || 'Refresh token failed');
          }
          const user = response.data;

          localStorage.setItem('userData', JSON.stringify(user));
          this.authFacadeService.userSubject.next(user);

          this.refreshTokenSubject.next(user.accessToken);
          return next.handle(this.addToken(request, user.accessToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authFacadeService.logout();
          this.notificationService.showMessage(
            SEVERITY.ERROR,
            'Authentication failed, please try login again!',
          );
          return throwError(() => err);
        }),
      );
    } else {
      return this.refreshTokenSubject.pipe(
        switchMap((accessToken) => {
          if (accessToken) return next.handle(this.addToken(request, accessToken));

          return throwError(() => new Error());
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
    }
  }
}
