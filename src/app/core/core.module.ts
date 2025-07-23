import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [NavbarComponent, LoaderComponent],
  imports: [
    CommonModule, // Ensure CommonModule is correctly imported
    CoreRoutingModule,
    SharedModule,
  ],
  exports: [NavbarComponent, LoaderComponent],
})
export class CoreModule {}
