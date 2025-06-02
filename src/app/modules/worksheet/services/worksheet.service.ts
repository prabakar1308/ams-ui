import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@app/shared/models/response';

import { WorksheetTank } from '../models/active-worksheet';
import { CreateWorksheetRequest, UpdateWorksheetRequest } from '../models/create-worksheet';
import { ActiveRestock } from '../models/restock';
import { CreateHarvestRequest } from '../models/create-harvest';
import { Transit, TransitPayload } from '../models/transit';
import { HarvestFilter } from '@app/shared/models/shared-state';
import { HarvestDetails } from '../models/harvest-details';
import { CreateTransitRequest } from '../models/create-transit';

@Injectable({
  providedIn: 'root',
})
export class WorksheetService {
  private API_URL = 'http://localhost:3000/api/worksheet';

  constructor(private http: HttpClient) {}

  getActiveWorksheets(userId: number, tankTypeId: number, statusId: number) {
    return this.http.post<Response<WorksheetTank[]>>(`${this.API_URL}/get-active-worksheets`, {
      userId,
      tankTypeId,
      statusId,
    });
  }

  createWorksheets(request: CreateWorksheetRequest) {
    return this.http.post<Response<WorksheetTank[]>>(`${this.API_URL}/create-worksheets`, request);
  }

  updateWorksheets(request: UpdateWorksheetRequest) {
    return this.http.patch<Response<WorksheetTank[]>>(`${this.API_URL}/update-worksheets`, request);
  }

  // restock
  getRestocks(status: string) {
    return this.http.get<Response<ActiveRestock[]>>(
      `${this.API_URL}/get-restocks?status=${status}`,
    );
  }

  // harvest
  getHarvests(unitId: number, statusIds: string[]) {
    return this.http.post<Response<HarvestDetails[]>>(`${this.API_URL}/get-harvests`, {
      unitId,
      statusIds,
    });
  }

  createHarvest(request: CreateHarvestRequest) {
    return this.http.post<Response<any>>(`${this.API_URL}/create-multiple-harvest`, request);
  }

  // Transits
  getTransits(payload: TransitPayload) {
    return this.http.post<Response<Transit[]>>(`${this.API_URL}/get-transits`, payload);
  }

  createTransit(request: CreateTransitRequest) {
    return this.http.post<Response<any>>(`${this.API_URL}/create-multiple-transit`, request);
  }
}
