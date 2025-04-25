import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardResponse } from '../models/dashboard-response';
import { Response } from '../../../shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_URL = 'http://localhost:3000/api/dashboard';
  
    constructor(private http: HttpClient) {}
  
    getActiveWorksheets(userId: number, tankTypeId: number, statusId: number) {
      return this.http.post<Response<DashboardResponse>>(`${this.API_URL}/active-worksheets`, {
        userId,
        tankTypeId,
        statusId
      });
    }
}
