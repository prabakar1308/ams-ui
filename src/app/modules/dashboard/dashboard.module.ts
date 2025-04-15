import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardReportsComponent } from './components/dashboard-reports/dashboard-reports.component';
import { DashboardStatusComponent } from './components/dashboard-status/dashboard-status.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardReportsComponent,
    DashboardStatusComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
