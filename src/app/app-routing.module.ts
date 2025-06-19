import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@app/auth/auth.module';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { ADMIN, FM_USER, USER } from './core/core.contants';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => AuthModule,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'worksheet',
    loadChildren: () =>
      import('./modules/worksheet/worksheet.module').then((m) => m.WorksheetModule),
    canActivate: [AuthGuard, roleGuard],
    data: { roles: [ADMIN, USER] },
  },
  {
    path: 'master',
    loadChildren: () => import('./modules/master/master.module').then((m) => m.MasterModule),
    canActivate: [AuthGuard, roleGuard],
    data: { roles: [ADMIN] },
  },
  {
    path: 'reports',
    loadChildren: () => import('./modules/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthGuard, roleGuard],
    data: { roles: [ADMIN, FM_USER] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
