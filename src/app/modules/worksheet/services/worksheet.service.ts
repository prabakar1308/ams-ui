import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@app/shared/models/response';

import { ActiveWorksheet } from '../models/active-worksheet';
import { CreateWorksheetRequest, UpdateWorksheetRequest } from '../models/create-worksheet';
import { ActiveRestock } from '../models/restock';

@Injectable({
  providedIn: 'root',
})
export class WorksheetService {
  private API_URL = 'http://localhost:3000/api/worksheet';

  constructor(private http: HttpClient) {}

  getActiveWorksheets(userId: number, tankTypeId: number, statusId: number) {
    return this.http.post<Response<ActiveWorksheet[]>>(`${this.API_URL}/get-active-worksheets`, {
      userId,
      tankTypeId,
      statusId,
    });
  }

  createWorksheets(request: CreateWorksheetRequest) {
    return this.http.post<Response<ActiveWorksheet[]>>(
      `${this.API_URL}/create-worksheets`,
      request,
    );
  }

  updateWorksheets(request: UpdateWorksheetRequest) {
    return this.http.post<Response<ActiveWorksheet[]>>(
      `${this.API_URL}/update-worksheets`,
      request,
    );
  }

  // restock
  getRestocks(status: string) {
    return this.http.get<Response<ActiveRestock[]>>(
      `${this.API_URL}/get-restocks?status=${status}`,
    );
  }
}
