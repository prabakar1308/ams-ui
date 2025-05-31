import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@app/shared/models/response';
import { TransitReport } from '../models/transit-response';
import { TransitRequest } from '../models/transit-request';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private WS_API_URL = 'http://localhost:3000/api/worksheet';
  constructor(private http: HttpClient) {}

  getTransitReport(payload: TransitRequest) {
    return this.http.post<Response<TransitReport[]>>(
      `${this.WS_API_URL}/get-transits-by-unit-sector`,
      payload,
    );
  }
}
