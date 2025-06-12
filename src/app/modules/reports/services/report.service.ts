import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@app/shared/models/response';
import { environment } from '@environments/environment';
import { TransitReport } from '../models/transit-response';
import { TransitRequest } from '../models/transit-request';
import { StockInput, StockInputRequest } from '../models/stock-input';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private host = environment.HOST;
  private WS_API_URL = `${this.host}/worksheet`;
  constructor(private http: HttpClient) {}

  getTransitReport(payload: TransitRequest) {
    return this.http.post<Response<TransitReport[]>>(
      `${this.WS_API_URL}/get-transits-by-unit-sector`,
      payload,
    );
  }

  getStockInputReport(payload: StockInputRequest) {
    return this.http.post<Response<StockInput>>(
      `${this.WS_API_URL}/get-worksheet-input-report`,
      payload,
    );
  }
}
