import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterHomeComponent } from './components/master-home/master-home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GenericDataComponent } from './components/generic-data/generic-data.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@app/shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { MasterDetailsComponent } from './components/master-details/master-details.component';

@NgModule({
  declarations: [
    MasterHomeComponent,
    GenericDataComponent,
    UserDetailsComponent,
    MasterDetailsComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    SharedModule,
    MaterialModule,
  ],
})
export class MasterModule {}
