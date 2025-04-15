import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorksheetHomeComponent } from './components/worksheet-home/worksheet-home.component';

const routes: Routes = [{ path: '', component: WorksheetHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetRoutingModule {}
