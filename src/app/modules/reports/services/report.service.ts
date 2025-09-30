import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@app/shared/models/response';
import { environment } from '@environments/environment';
import { TransitReport } from '../models/transit-response';
import { TransitRequest } from '../models/transit-request';
import { StockInput, StockInputRequest, StockInputUnit } from '../models/stock-input';

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

  getActiveStockInputReport() {
    return this.http.get<Response<StockInput>>(
      `${this.WS_API_URL}/get-active-worksheet-input-report`,
    );
  }

  getAvailableStockInputReport() {
    return this.http.get<Response<StockInputUnit[]>>(
      `${this.WS_API_URL}/get-available-worksheet-input-report`,
    );
  }
}
