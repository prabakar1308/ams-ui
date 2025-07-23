import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { SharedModule } from '@app/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardStatusComponent } from './components/dashboard-status/dashboard-status.component';
import { dashboardReducer } from './state/dashboard.reducer';
import { DashboardEffects } from './state/dashboard.effects';
import { DashboardTanksComponent } from './components/dashboard-tanks/dashboard-tanks.component';
import { TankListComponent } from './components/dashboard-tanks/tank-list/tank-list.component';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardStatusComponent,
    DashboardTanksComponent,
    TankListComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
    NgxEchartsModule.forRoot({ echarts }),
  ],
})
export class DashboardModule {}
