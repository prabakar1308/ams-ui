import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterHomeComponent } from './components/master-home/master-home.component';

const routes: Routes = [{ path: '', component: MasterHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
