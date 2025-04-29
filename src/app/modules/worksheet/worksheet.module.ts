import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksheetRoutingModule } from './worksheet-routing.module';
import { WorksheetHomeComponent } from './components/worksheet-home/worksheet-home.component';
import { StoreModule } from '@ngrx/store';
import { worksheetReducer } from './state/worksheet.reducer';
import { SharedModule } from '../../shared/shared.module';
import { WorksheetFilterComponent } from './components/worksheet-home/worksheet-filter/worksheet-filter.component';
import { EffectsModule } from '@ngrx/effects';
import { WorksheetEffects } from './state/worksheet.effects';
import { WorksheetCreateComponent } from './components/worksheet-create/worksheet-create.component';

@NgModule({
  declarations: [WorksheetHomeComponent, WorksheetFilterComponent, WorksheetCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    WorksheetRoutingModule,
    StoreModule.forFeature('worksheet', worksheetReducer),
    EffectsModule.forFeature([WorksheetEffects]),
  ],
})
export class WorksheetModule {}
