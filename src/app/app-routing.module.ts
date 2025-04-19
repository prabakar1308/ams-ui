import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from '@auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => AuthModule,
    // import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'worksheet',
    loadChildren: () =>
      import('./modules/worksheet/worksheet.module').then(
        (m) => m.WorksheetModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'master',
    loadChildren: () =>
      import('./modules/master/master.module').then((m) => m.MasterModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
