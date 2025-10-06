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
  UpdateWorksheet,
  UpdateWorksheetRequest,
} from '../models/create-worksheet';
import { ActiveRestock } from '../models/restock';
import { CreateHarvest, CreateHarvestRequest } from '../models/create-harvest';
import { Transit, TransitPayload, TransitUpdate } from '../models/transit';
import { HarvestDetails } from '../models/harvest-details';
import { CreateTransitRequest } from '../models/create-transit';
import { MonitoringCount } from '../models/monitoring-count';

@Injectable({
  providedIn: 'root',
})
export class WorksheetFacadeService {
  currentWorksheet$: Observable<UpdateWorksheet | null>;
  activeWorksheets$: Observable<WorksheetTank[]>;
  activeRestocks$: Observable<ActiveRestock[]>;
  transits$: Observable<Transit[]>;
  tankSelection$: Observable<TankSelection>;
  meta$: Observable<MetaState>;
  activeHarvestData$: Observable<{ data: HarvestDetails[]; totalRecords: number }>;
  currentHarvest$: Observable<HarvestDetails | null>;
  monitoringCount$: Observable<MonitoringCount>;

  constructor(private store: Store<fromStore.AppState>) {
    this.currentWorksheet$ = this.store.select(fromStore.getCurrentWorksheet);
    this.activeWorksheets$ = this.store.select(fromStore.getActiveWorksheets);
    this.activeRestocks$ = this.store.select(fromStore.getActiveRestocks);
    this.transits$ = this.store.select(fromStore.getTransits);
    this.tankSelection$ = this.store.select(fromStore.getWorksheetTankDetails);
    this.meta$ = this.store.select(fromStore.getMetaInfo);
    this.activeHarvestData$ = this.store.select(fromStore.getHarvestData);
    this.currentHarvest$ = this.store.select(fromStore.getCurrentHarvest);
    this.monitoringCount$ = this.store.select(fromStore.getMonitoringCount);
  }

  getCurrentWorksheet(id: number) {
    this.store.dispatch(worksheetActions.getCurrentWorksheet(id));
  }

  resetCurrentWorksheet() {
    this.store.dispatch(worksheetActions.resetCurrentWorksheet());
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
    this.store.dispatch(worksheetActions.updateWorksheets(request));
  }

  updateWorksheetTankSelection(data: TankSelection) {
    this.store.dispatch(worksheetActions.updateWorksheetTankDetails(data));
  }

  updateWorksheetParams(request: UpdateWorksheet) {
    this.store.dispatch(worksheetActions.updateWorksheetParams(request));
  }

  //Restocks
  getActiveRestocks(status: string) {
    this.store.dispatch(worksheetActions.getActiveRestocks(status));
  }

  // harvests
  getHarvests(data: HarvestFilter) {
    this.store.dispatch(worksheetActions.getHarvests(data));
  }

  getHarvestsSuccess(response: { data: HarvestDetails[]; totalRecords: number }) {
    this.store.dispatch(worksheetActions.getHarvestsSuccess(response));
  }

  getCurrentHarvest(id: number) {
    this.store.dispatch(worksheetActions.getCurrentHarvest(id));
  }

  getCurrentHarvestSuccess(response: HarvestDetails) {
    this.store.dispatch(worksheetActions.getCurrentHarvestSuccess(response));
  }

  createHarvest(request: CreateHarvestRequest) {
    this.store.dispatch(worksheetActions.createHarvest(request));
  }

  updateHarvest(request: CreateHarvest) {
    this.store.dispatch(worksheetActions.updateHarvest(request));
  }

  // get transits
  getTransits(payload: TransitPayload) {
    this.store.dispatch(worksheetActions.getTransits(payload));
  }

  createTransit(request: CreateTransitRequest) {
    this.store.dispatch(worksheetActions.createTransit(request));
  }

  updateTransit(request: { payload: TransitUpdate; days: number }) {
    this.store.dispatch(worksheetActions.updateTransit(request));
  }

  getMonitoringCount() {
    this.store.dispatch(worksheetActions.getMonitoringCount());
  }
}
