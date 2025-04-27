import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusDetails } from '@shared/models/status-details';
import { Response } from '@shared/models/response';
import { UserDetails } from '@shared/models/user-details';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getStatusData() {
        return this.http.get<Response<StatusDetails>>(`${this.API_URL}/master/worksheet-status`);
      }
  
  getUserData() {
        return this.http.get<Response<UserDetails>>(`${this.API_URL}/users`);
      }

}
