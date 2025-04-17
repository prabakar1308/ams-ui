import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Response } from '../../../shared/models/response';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentTokenSubject: BehaviorSubject<any>;
  public currrentToken: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('tokens') || '{}')
    );
    this.currrentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValues() {
    return this.currentTokenSubject.value;
  }

  login(userId: string, password: string) {
    return this.http
      .post<Response<AuthResponse>>(`${this.apiUrl}/sign-in`, {
        userId,
        password,
      })
      .pipe(
        map((response) => {
          const tokens = response.data;
          if (tokens) {
            localStorage.setItem('tokens', JSON.stringify(tokens));
            this.currentTokenSubject.next(tokens);
          }
          return response;
        })
      );
  }

  refreshToken() {
    return this.http
      .post<any>(`${this.apiUrl}/refresh-token`, {
        refreshToken: this.currentTokenValues.refreshToken,
      })
      .pipe(
        map((response) => {
          const tokens = response.data;
          if (tokens && tokens.accessToken) {
            const currrentToken = this.currentTokenValues;
            currrentToken.accessToken = tokens.accessToken;
            localStorage.setItem(
              'currrentToken',
              JSON.stringify(currrentToken)
            );
            this.currentTokenSubject.next(currrentToken);
          }
          // TODO: handle error if tokens are not present
          return tokens;
        }),
        catchError((error) => {
          this.logout();
          throw error;
        })
      );
  }

  logout() {
    localStorage.removeItem('currrentToken');
    this.currentTokenSubject.next(null);
    return this.http.post('/api/logout', {});
  }
}
