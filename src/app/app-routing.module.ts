import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'worksheet',
    loadChildren: () =>
      import('./modules/worksheet/worksheet.module').then(
        (m) => m.WorksheetModule
      ),
  },
  {
    path: 'master',
    loadChildren: () =>
      import('./modules/master/master.module').then((m) => m.MasterModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
