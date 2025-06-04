import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorksheetStatus } from '@app/shared/models/worksheet-status';
import { Response } from '@app/shared/models/response';
import { UserDetails } from '@app/shared/models/user-details';
import { environment } from '@environments/environment';
import {
  HarvestType,
  MasterGeneric,
  MasterRange,
  UnitSector,
  WorksheetUnit,
} from '../models/master';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private API_URL = environment.HOST;

  constructor(private http: HttpClient) {}

  getWorksheetStatus() {
    return this.http.get<Response<WorksheetStatus[]>>(`${this.API_URL}/master/worksheet-status`);
  }

  getUserData() {
    return this.http.get<Response<{ data: UserDetails[] }>>(`${this.API_URL}/users`);
  }

  // harvest type
  getHarvestTypes() {
    return this.http.get<Response<HarvestType[]>>(`${this.API_URL}/master/harvest-type`);
  }

  // ph, salnity, temperature, tank
  getMasterRange(method: string) {
    return this.http.get<Response<MasterRange>>(`${this.API_URL}/master/${method}`);
  }

  // tank-types, unit
  getMasterGeneric(method: string) {
    return this.http.get<Response<MasterGeneric[]>>(`${this.API_URL}/master/${method}`);
  }

  getUnitSector() {
    return this.http.get<Response<UnitSector[]>>(`${this.API_URL}/master/unit-sector`);
  }

  getWorksheetUnits() {
    return this.http.get<Response<WorksheetUnit[]>>(`${this.API_URL}/master/worksheet-unit`);
  }
}
