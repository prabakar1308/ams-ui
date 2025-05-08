import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MetaState } from '@app/shared/models/meta-state';
import { WorksheetFilter } from '@app/shared/models/shared-state';
import * as fromStore from '../state';
import * as worksheetActions from '../state/worksheet.actions';
import { WorksheetTank } from '../models/active-worksheet';
import {
  CreateWorksheetRequest,
  TankSelection,
  UpdateWorksheetRequest,
} from '../models/create-worksheet';

@Injectable({
  providedIn: 'root',
})
export class WorksheetFacadeService {
  activeWorksheets$: Observable<WorksheetTank[]>;
  tankSelection$: Observable<TankSelection>;
  meta$: Observable<MetaState>;

  constructor(private store: Store<fromStore.AppState>) {
    this.activeWorksheets$ = this.store.select(fromStore.getActiveWorksheets);
    this.tankSelection$ = this.store.select(fromStore.getWorksheetTankDetails);
    this.meta$ = this.store.select(fromStore.getMetaInfo);
  }

  getActiveWorksheets(filterData: WorksheetFilter) {
    this.store.dispatch(worksheetActions.getActiveWorksheets(filterData));
  }

  getActiveWorksheetsSuccess(response: WorksheetTank[]) {
    this.store.dispatch(worksheetActions.getActiveWorksheetsSuccess(response));
  }

  createWorksheets(request: CreateWorksheetRequest) {
    this.store.dispatch(worksheetActions.createWorksheet(request));
  }

  updateWorksheets(request: UpdateWorksheetRequest) {
    this.store.dispatch(worksheetActions.updateWorksheet(request));
  }

  updateWorksheetTankSelection(data: TankSelection) {
    this.store.dispatch(worksheetActions.updateWorksheetTankDetails(data));
  }
}
