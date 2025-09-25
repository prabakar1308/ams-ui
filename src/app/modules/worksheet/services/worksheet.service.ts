import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@app/shared/models/response';

import { environment } from '@environments/environment';
import { WorksheetFilter } from '@app/shared/models/shared-state';
import { WorksheetTank } from '../models/active-worksheet';
import {
  CreateWorksheetRequest,
  UpdateWorksheet,
  UpdateWorksheetRequest,
} from '../models/create-worksheet';
import { ActiveRestock } from '../models/restock';
import { CreateHarvestRequest } from '../models/create-harvest';
import { Transit, TransitPayload, TransitUpdate } from '../models/transit';
import { HarvestDetails } from '../models/harvest-details';
import { CreateTransitRequest } from '../models/create-transit';
import { MonitoringCount } from '../models/monitoring-count';

@Injectable({
  providedIn: 'root',
})
export class WorksheetService {
  private host = environment.HOST;
  private API_URL = `${this.host}/worksheet`;

  constructor(private http: HttpClient) {}

  getActiveWorksheets(payload: WorksheetFilter) {
    return this.http.post<Response<WorksheetTank[]>>(
      `${this.API_URL}/get-active-worksheets`,
      payload,
    );
  }

  getWorksheetById(id: number) {
    return this.http.get<Response<any>>(`${this.API_URL}/get-worksheet/${id}`);
  }

  createWorksheets(request: CreateWorksheetRequest) {
    return this.http.post<Response<WorksheetTank[]>>(`${this.API_URL}/create-worksheets`, request);
  }

  updateWorksheets(request: UpdateWorksheetRequest) {
    return this.http.patch<Response<WorksheetTank[]>>(`${this.API_URL}/update-worksheets`, request);
  }

  updateWorksheetParams(request: UpdateWorksheet) {
    return this.http.patch<Response<WorksheetTank[]>>(
      `${this.API_URL}/update-worksheet-params`,
      request,
    );
  }

  deleteWorksheet(id: number) {
    return this.http.delete<Response<WorksheetTank[]>>(
      `${this.API_URL}/soft-delete-worksheet?id=${id}`,
    );
  }

  // restock
  getRestocks(status: string) {
    return this.http.get<Response<ActiveRestock[]>>(
      `${this.API_URL}/get-restocks?status=${status}`,
    );
  }

  // harvest
  getHarvests(unitId: number, statusIds: string[]) {
    return this.http.post<Response<{ data: HarvestDetails[]; totalRecords: number }>>(
      `${this.API_URL}/get-harvests`,
      {
        unitId,
        statusIds,
      },
    );
  }

  getCurrentHarvest(id: number) {
    return this.http.get<Response<HarvestDetails>>(`${this.API_URL}/get-harvest/${id}`);
  }

  createHarvest(request: CreateHarvestRequest) {
    return this.http.post<Response<any>>(`${this.API_URL}/create-multiple-harvest`, request);
  }

  updateHarvest(request: CreateHarvestRequest) {
    return this.http.post<Response<any>>(`${this.API_URL}/update-harvest`, request);
  }

  // Transits
  getTransits(payload: TransitPayload) {
    return this.http.post<Response<Transit[]>>(`${this.API_URL}/get-transits`, payload);
  }

  getTransitsByHarvestId(harvestId: number) {
    return this.http.get<Response<Transit[]>>(
      `${this.API_URL}/get-transits-by-harvest-id/${harvestId}`,
    );
  }

  createTransit(request: CreateTransitRequest) {
    return this.http.post<Response<any>>(`${this.API_URL}/create-multiple-transit`, request);
  }

  updateTransit(request: TransitUpdate) {
    return this.http.post<Response<any>>(`${this.API_URL}/update-transit`, request);
  }

  getMonitoringCount() {
    return this.http.get<Response<MonitoringCount>>(`${this.API_URL}/monitoring-count`);
  }
}
