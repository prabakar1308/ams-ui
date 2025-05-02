import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { StoreModule } from '@ngrx/store';
import { sharedReducer } from './state/shared-reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './state/shared-effects';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { CustomRangePanelComponent } from './components/custom-header/custom-range-panel/custom-range-panel.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    FormGeneratorComponent,
    DateRangePickerComponent,
    CustomHeaderComponent,
    CustomRangePanelComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('shared', sharedReducer),
    EffectsModule.forFeature([SharedEffects]),
  ],
  exports: [
    MaterialModule,
    FormGeneratorComponent,
    DateRangePickerComponent,
    ConfirmationDialogComponent,
  ],
})
export class SharedModule {}
