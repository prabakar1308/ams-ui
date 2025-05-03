import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '@app/shared/shared.module';

import { WorksheetRoutingModule } from './worksheet-routing.module';
import { worksheetReducer } from './state/worksheet.reducer';
import { WorksheetEffects } from './state/worksheet.effects';
import { WorksheetHomeComponent } from './components/worksheet-home/worksheet-home.component';
import { WorksheetFilterComponent } from './components/worksheet-home/worksheet-filter/worksheet-filter.component';
import { WorksheetCreateComponent } from './components/worksheet-create/worksheet-create.component';
import { WorksheetUpdateDialogComponent } from './components/worksheet-update-dialog/worksheet-update-dialog.component';
import { HarvestHomeComponent } from './components/harvest/harvest-home/harvest-home.component';
import { HarvestCreateComponent } from './components/harvest/harvest-create/harvest-create.component';

@NgModule({
  declarations: [WorksheetHomeComponent, WorksheetFilterComponent, WorksheetCreateComponent, WorksheetUpdateDialogComponent, HarvestHomeComponent, HarvestCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    WorksheetRoutingModule,
    StoreModule.forFeature('worksheet', worksheetReducer),
    EffectsModule.forFeature([WorksheetEffects]),
  ],
})
export class WorksheetModule {}
