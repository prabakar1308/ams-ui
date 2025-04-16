import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';
  // `${process.env['API_URL']}/auth` || 'http://localhost:3001/api/auth';
  constructor(private http: HttpClient) {}

  login(userId: string, password: string) {
    return this.http.post(`${this.apiUrl}/sign-in`, { userId, password });
  }

  logout() {
    return this.http.post('/api/logout', {});
  }
}
