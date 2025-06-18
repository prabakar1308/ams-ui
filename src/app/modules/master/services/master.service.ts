import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private API_URL = environment.HOST;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.API_URL}/users?limit=10&page=1`);
  }

  generateUserCode() {
    return this.http.get(`${this.API_URL}/users/generate-user-code`);
  }
}
