import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardReportsComponent } from './components/dashboard-reports/dashboard-reports.component';
import { DashboardStatusComponent } from './components/dashboard-status/dashboard-status.component';
import { dashboardReducer } from './state/dashboard.reducer';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardReportsComponent,
    DashboardStatusComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
  ],
})
export class DashboardModule {}
