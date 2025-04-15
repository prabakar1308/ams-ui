import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportHomeComponent } from './components/report-home/report-home.component';

@NgModule({
  declarations: [ReportHomeComponent],
  imports: [CommonModule, ReportsRoutingModule],
})
export class ReportsModule {}
