import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { SharedModule } from '@app/shared/shared.module';

import { reportReducer } from './state/report.reducer';
import { ReportEffects } from './state/report.effects';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportHomeComponent } from './components/report-home/report-home.component';
import { LiveArtemiaReportComponent } from './components/live-artemia-report/live-artemia-report.component';
import { StockInputReportComponent } from './components/stock-input-report/stock-input-report.component';
import { StockInputDetailsComponent } from './components/stock-input-report/stock-input-details/stock-input-details.component';
import { TotalArtemiaReportComponent } from './components/total-artemia-report/total-artemia-report.component';
import { TotalArtemiaChartComponent } from './components/total-artemia-report/total-artemia-chart/total-artemia-chart.component';

@NgModule({
  declarations: [
    ReportHomeComponent,
    LiveArtemiaReportComponent,
    StockInputReportComponent,
    StockInputDetailsComponent,
    TotalArtemiaReportComponent,
    TotalArtemiaChartComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    StoreModule.forFeature('report', reportReducer),
    EffectsModule.forFeature([ReportEffects]),
    NgxEchartsModule.forRoot({ echarts }),
  ],
})
export class ReportsModule {}
