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
  SourceTracker,
  UnitSector,
  WorksheetUnit,
} from '../models/master';
import { CreateUserRequest } from '../models/create-user';
import { CreateWorksheetUnitRequest } from '../models/create-worksheet-unit';

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
  createUser(request: CreateUserRequest) {
    return this.http.post<Response<any>>(`${this.API_URL}/users`, request);
  }
  updateUser(request: any[]) {
    return this.http.patch<Response<any>>(`${this.API_URL}/users`, request);
  }
  deleteUser(id: number) {
    return this.http.delete<Response<any>>(`${this.API_URL}/users/delete-user?id=${id}`);
  }
  createWorksheetUnit(request: CreateWorksheetUnitRequest) {
    return this.http.post<Response<any>>(`${this.API_URL}/master/worksheet-unit`, request);
  }
  updateWorksheetUnit(request: any[]) {
    return this.http.patch<Response<any>>(`${this.API_URL}/master/worksheet-unit`, request);
  }
  resetUserPassword(request: any[]) {
    return this.http.patch<Response<any>>(`${this.API_URL}/users/reset-password`, request);
  }
  getSourceTracker(request: any) {
    return this.http.post<Response<{ data: SourceTracker[] }>>(
      `${this.API_URL}/master/source-tracker-list`,
      request,
    );
  }
}
