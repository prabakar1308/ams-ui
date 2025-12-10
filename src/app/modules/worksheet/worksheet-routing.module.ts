import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorksheetHomeComponent } from './components/worksheet-home/worksheet-home.component';
import { WorksheetCreateComponent } from './components/worksheet-create/worksheet-create.component';
import { HarvestHomeComponent } from './components/harvest/harvest-home/harvest-home.component';
import { HarvestCreateComponent } from './components/harvest/harvest-create/harvest-create.component';
import { RestockListComponent } from './components/restock-list/restock-list.component';
import { TransitListComponent } from './components/transit/transit-list/transit-list.component';

const routes: Routes = [
  { path: '', component: WorksheetHomeComponent },
  { path: 'create', component: WorksheetCreateComponent },
  { path: 'harvest', component: HarvestHomeComponent },
  { path: 'harvest/create', component: HarvestCreateComponent },
  { path: 'restock', component: RestockListComponent },
  { path: 'transit', component: TransitListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetRoutingModule {}
