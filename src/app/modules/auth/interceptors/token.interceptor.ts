import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthFacadeService } from '../services/auth-facade.service';
import { AuthResponse } from '../models/auth-response';
import { Response } from '@shared/models/response';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: AuthService,
    private authFacadeService: AuthFacadeService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
      })
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
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((accessToken) => {
          return next.handle(this.addToken(request, accessToken));
        })
      );
    }
  }
}
