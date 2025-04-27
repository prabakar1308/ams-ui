import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { StoreModule } from '@ngrx/store';
import { statusReducer } from './state/status-reducer'
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './state/shared-effects';
import { UserReducer } from './state/user-reducer';
import { UserEffects } from './state/user-effect';

@NgModule({
  declarations: [FormGeneratorComponent],
  imports: [CommonModule, MaterialModule,
    StoreModule.forFeature('shared', statusReducer),
    StoreModule.forFeature('userDerails', UserReducer),
    EffectsModule.forFeature([SharedEffects]),
    EffectsModule.forFeature([UserEffects]),
  ],
  exports: [MaterialModule, FormGeneratorComponent],

})
export class SharedModule {}
