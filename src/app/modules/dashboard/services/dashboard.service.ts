import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Response } from '@app/shared/models/response';
import { DashboardResponse, InStockResponse, TankWiseStatus } from '../models/dashboard-response';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private API_URL = 'http://localhost:3000/api/dashboard';
  private WS_API_URL = 'http://localhost:3000/api/worksheet';

  constructor(private http: HttpClient) {}

  getActiveWorksheets(userId: number, tankTypeId: number, statusId: number) {
    return this.http.post<Response<DashboardResponse>>(`${this.API_URL}/active-worksheets`, {
      userId,
      tankTypeId,
      statusId,
    });
  }

  getHarvestCount(unitId: number, statusIds: string[]) {
    return this.http.post<Response<number>>(`${this.WS_API_URL}/get-harvests-count`, {
      unitId,
      statusIds,
    });
  }

  getTransitsCount(unitId: number, days: number) {
    return this.http.post<Response<number>>(`${this.WS_API_URL}/get-transits-count`, {
      unitId,
      days,
    });
  }

  getRestockCount(status: string) {
    return this.http.get<Response<number>>(
      `${this.WS_API_URL}/get-restocks-count?status=${status}`,
    );
  }

  getInStockCount(tankTypeId: number) {
    return this.http.get<Response<InStockResponse[]>>(
      `${this.WS_API_URL}/get-worksheets-instock-count?tankTypeId=${tankTypeId}`,
    );
  }

  getTankWiseStatus(tankTypeId: number): Observable<TankWiseStatus[]> {
    return this.http
      .get<Response<TankWiseStatus[]>>(`${this.API_URL}/tank-wise-statuses/${tankTypeId}`)
      .pipe(map((resp) => resp.data));
  }

  getUsersByTankWise(tankTypeId: number): Observable<TankWiseStatus[]> {
    return this.http
      .get<Response<TankWiseStatus[]>>(`${this.API_URL}/tank-wise-users/${tankTypeId}`)
      .pipe(map((resp) => resp.data));
  }
}
