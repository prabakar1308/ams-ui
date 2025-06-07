import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../../shared/models/response';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host = environment.HOST;
  private API_URL = `${this.host}/auth`;

  constructor(private http: HttpClient) {}

  login(userId: string, password: string) {
    return this.http.post<Response<AuthResponse>>(`${this.API_URL}/sign-in`, {
      userId,
      password,
    });
  }

  refreshToken(refreshToken: string): Observable<Response<AuthResponse>> {
    return this.http.post<Response<AuthResponse>>(`${this.API_URL}/refresh-token`, {
      refreshToken,
    });
  }
}
