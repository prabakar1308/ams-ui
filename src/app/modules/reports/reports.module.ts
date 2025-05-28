import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportHomeComponent } from './components/report-home/report-home.component';
import { SharedModule } from '@app/shared/shared.module';
import { LiveArtemiaReportComponent } from './components/live-artemia-report/live-artemia-report.component';
import { StoreModule } from '@ngrx/store';
import { reportReducer } from './state/report.reducer';
import { ReportEffects } from './state/report.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [ReportHomeComponent, LiveArtemiaReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    StoreModule.forFeature('report', reportReducer),
    EffectsModule.forFeature([ReportEffects]),
  ],
})
export class ReportsModule {}
