import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Response } from '@app/shared/models/response';
import { DashboardResponse, TankWiseStatus } from '../models/dashboard-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private API_URL = 'http://localhost:3000/api/dashboard';

  constructor(private http: HttpClient) {}

  getActiveWorksheets(userId: number, tankTypeId: number, statusId: number) {
    return this.http.post<Response<DashboardResponse>>(`${this.API_URL}/active-worksheets`, {
      userId,
      tankTypeId,
      statusId,
    });
  }

  getTankWiseStatus(tankTypeId: number): Observable<Response<TankWiseStatus[]>> {
    return this.http.get<Response<TankWiseStatus[]>>(
      `${this.API_URL}/tank-wise-statuses/${tankTypeId}`,
    );
  }

  getUsersByTankWise(tankTypeId: number): Observable<Response<TankWiseStatus[]>> {
    return this.http.get<Response<TankWiseStatus[]>>(
      `${this.API_URL}/tank-wise-users/${tankTypeId}`,
    );
  }
}
