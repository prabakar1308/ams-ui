import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorksheetStatus } from '@app/shared/models/worksheet-status';
import { Response } from '@app/shared/models/response';
import { UserDetails } from '@app/shared/models/user-details';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getWorksheetStatus() {
    return this.http.get<Response<WorksheetStatus[]>>(`${this.API_URL}/master/worksheet-status`);
  }

  getUserData() {
    return this.http.get<Response<{ data: UserDetails[] }>>(`${this.API_URL}/users`);
  }
}
