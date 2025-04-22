import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared/shared.module';
import { WorksheetRoutingModule } from './worksheet-routing.module';
import { WorksheetHomeComponent } from './components/worksheet-home/worksheet-home.component';
import { worksheetReducer } from './state/worksheet.reducer';

@NgModule({
  declarations: [WorksheetHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    WorksheetRoutingModule,
    StoreModule.forFeature('worksheet', worksheetReducer),
  ],
})
export class WorksheetModule {}
