import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
