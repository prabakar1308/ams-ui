import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardReportsComponent } from './components/dashboard-reports/dashboard-reports.component';
import { DashboardStatusComponent } from './components/dashboard-status/dashboard-status.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from './state/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './state/dashboard.effects';
import { DashboardFilterComponent } from './components/dashboard-filter/dashboard-filter.component';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardReportsComponent,
    DashboardStatusComponent,
    DashboardFilterComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
})
export class DashboardModule {}
