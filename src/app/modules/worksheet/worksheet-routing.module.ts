import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorksheetHomeComponent } from './components/worksheet-home/worksheet-home.component';
import { WorksheetCreateComponent } from './components/worksheet-create/worksheet-create.component';

const routes: Routes = [
  { path: '', component: WorksheetHomeComponent },
  { path: 'create', component: WorksheetCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetRoutingModule {}
