import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MetaState } from '@shared/models/meta-state';
import * as fromStore from '../state';
import * as worksheetActions from '../state/worksheet.actions';
import { ActiveWorksheet } from '../models/active-worksheet';

@Injectable({
  providedIn: 'root',
})
export class WorksheetFacadeService {
  activeWorksheets$: Observable<ActiveWorksheet[]>;
  meta$: Observable<MetaState>;

  constructor(private store: Store<fromStore.AppState>) {
    this.activeWorksheets$ = this.store.select(fromStore.getActiveWorksheets);
    this.meta$ = this.store.select(fromStore.getMetaInfo);
  }

  getActiveWorksheets(userId: number, tankTypeId: number, statusId: number) {
    this.store.dispatch(worksheetActions.getActiveWorksheets({ userId, tankTypeId, statusId }));
  }

  getActiveWorksheetsSuccess(response: ActiveWorksheet[]) {
    this.store.dispatch(worksheetActions.getActiveWorksheetsSuccess(response));
  }
}
