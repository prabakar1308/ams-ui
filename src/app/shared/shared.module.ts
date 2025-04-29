import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { StoreModule } from '@ngrx/store';
import { sharedReducer } from './state/shared-reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './state/shared-effects';

@NgModule({
  declarations: [FormGeneratorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('shared', sharedReducer),
    EffectsModule.forFeature([SharedEffects]),
  ],
  exports: [MaterialModule, FormGeneratorComponent],
})
export class SharedModule {}
