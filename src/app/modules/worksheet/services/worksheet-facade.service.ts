import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MetaState } from '@app/shared/models/meta-state';
import { WorksheetFilter } from '@app/shared/models/shared-state';
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

  getActiveWorksheets(filterData: WorksheetFilter) {
    this.store.dispatch(worksheetActions.getActiveWorksheets(filterData));
  }

  getActiveWorksheetsSuccess(response: ActiveWorksheet[]) {
    this.store.dispatch(worksheetActions.getActiveWorksheetsSuccess(response));
  }
}
