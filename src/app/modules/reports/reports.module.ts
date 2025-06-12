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
import { StockInputReportComponent } from './components/stock-input-report/stock-input-report.component';
import { StockInputDetailsComponent } from './components/stock-input-report/stock-input-details/stock-input-details.component';
import { TotalArtemiaReportComponent } from './components/total-artemia-report/total-artemia-report.component';

@NgModule({
  declarations: [ReportHomeComponent, LiveArtemiaReportComponent, StockInputReportComponent, StockInputDetailsComponent, TotalArtemiaReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    StoreModule.forFeature('report', reportReducer),
    EffectsModule.forFeature([ReportEffects]),
  ],
})
export class ReportsModule {}
