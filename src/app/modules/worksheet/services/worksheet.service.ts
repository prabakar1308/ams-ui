import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@shared/models/response';

import { ActiveWorksheet } from '../models/active-worksheet';

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
}
