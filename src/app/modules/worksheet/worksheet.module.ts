import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksheetRoutingModule } from './worksheet-routing.module';
import { WorksheetHomeComponent } from './components/worksheet-home/worksheet-home.component';
import { StoreModule } from '@ngrx/store';
import { worksheetReducer } from './state/worksheet.reducer';

@NgModule({
  declarations: [WorksheetHomeComponent],
  imports: [
    CommonModule,
    WorksheetRoutingModule,
    StoreModule.forFeature('worksheet', worksheetReducer),
  ],
})
export class WorksheetModule {}
