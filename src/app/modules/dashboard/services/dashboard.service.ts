import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardResponse } from '../models/dashboard-response';
import { Response } from '../../../shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_URL = 'http://localhost:3000/api/dashboard';
  //private httpHeaders = { Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0NTE2NTQ1MiwiZXhwIjoxNzQ1MjUxODUyLCJhdWQiOiJsb2NhbGhvc3Q6MzAwMCIsImlzcyI6ImxvY2FsaG9zdDozMDAwIn0.hHYJndm01bFo_OZ9K5rmVRl9kr7Un5no9BzBUR9pRBI'};
  
    //'Authorization': `Bearer ${localStorage.getItem('token')}`
  
    constructor(private http: HttpClient) {}
  
    getActiveWorksheets(userId: number, tankTypeId: number, statusId: number) {
      console.log('userId', userId);
      return this.http.post<Response<DashboardResponse>>(`${this.API_URL}/active-worksheets`, {
        userId,
        tankTypeId,
        statusId
      });
    }
}
