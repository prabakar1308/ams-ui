import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WorksheetService } from '../services/worksheet.service';
import {
  getActiveWorksheets,
  getActiveWorksheetsSuccess,
  getActiveWorksheetsFailure,
} from './worksheet.actions';
import { Response } from '@shared/models/response';
import { ActiveWorksheet } from '../models/active-worksheet';

@Injectable()
export class WorksheetEffects {
  private actions$ = inject(Actions);
  private WorksheetService = inject(WorksheetService);

  getActiveWorksheets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActiveWorksheets.type),
      exhaustMap(({ payload: { userId, tankTypeId, statusId } }) =>
        this.WorksheetService.getActiveWorksheets(userId, tankTypeId, statusId).pipe(
          map((res: Response<ActiveWorksheet[]>) => {
            if (res.status !== 201) {
              return getActiveWorksheetsFailure({
                error: res.message || 'Get dashboard details failed',
              });
            }
            if (res.data) {
              return getActiveWorksheetsSuccess(res.data);
            }
            return getActiveWorksheetsFailure({
              error: res.message || 'Get dashboard details failed',
            });
          }),
          catchError((error) => of(getActiveWorksheetsFailure({ error }))),
        ),
      ),
    ),
  );
}
