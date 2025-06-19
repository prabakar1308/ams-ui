import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MetaState } from '@app/shared/models/meta-state';
import { HarvestFilter, WorksheetFilter } from '@app/shared/models/shared-state';
import * as fromStore from '../state';
import * as worksheetActions from '../state/worksheet.actions';
import { WorksheetTank } from '../models/active-worksheet';
import {
  CreateWorksheetRequest,
  TankSelection,
  UpdateWorksheetRequest,
} from '../models/create-worksheet';
import { ActiveRestock } from '../models/restock';
import { CreateHarvestRequest } from '../models/create-harvest';
import { Transit, TransitPayload } from '../models/transit';
import { HarvestDetails } from '../models/harvest-details';
import { CreateTransitRequest } from '../models/create-transit';

@Injectable({
  providedIn: 'root',
})
export class WorksheetFacadeService {
  activeWorksheets$: Observable<WorksheetTank[]>;
  activeRestocks$: Observable<ActiveRestock[]>;
  transits$: Observable<Transit[]>;
  tankSelection$: Observable<TankSelection>;
  meta$: Observable<MetaState>;
  activeHarvestList$: Observable<HarvestDetails[]>;

  constructor(private store: Store<fromStore.AppState>) {
    this.activeWorksheets$ = this.store.select(fromStore.getActiveWorksheets);
    this.activeRestocks$ = this.store.select(fromStore.getActiveRestocks);
    this.transits$ = this.store.select(fromStore.getTransits);
    this.tankSelection$ = this.store.select(fromStore.getWorksheetTankDetails);
    this.meta$ = this.store.select(fromStore.getMetaInfo);
    this.activeHarvestList$ = this.store.select(fromStore.getHarvestList);
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

  //Restocks
  getActiveRestocks(status: string) {
    this.store.dispatch(worksheetActions.getActiveRestocks(status));
  }

  // harvests
  getHarvests(data: HarvestFilter) {
    this.store.dispatch(worksheetActions.getHarvests(data));
  }

  getHarvestsSuccess(response: HarvestDetails[]) {
    this.store.dispatch(worksheetActions.getHarvestsSuccess(response));
  }

  createHarvest(request: CreateHarvestRequest) {
    this.store.dispatch(worksheetActions.createHarvest(request));
  }

  // get transits
  getTransits(payload: TransitPayload) {
    this.store.dispatch(worksheetActions.getTransits(payload));
  }

  createTransit(request: CreateTransitRequest) {
    this.store.dispatch(worksheetActions.createTransit(request));
  }
}
