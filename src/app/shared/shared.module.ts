import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';

@NgModule({
  declarations: [
    FormGeneratorComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule],
})
export class SharedModule {}
