import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { SEVERITY } from '@app/core/core.contants';
import { NotificationService } from '@app/core/services/notification.service';
import { GenericForm, GenericOption } from '@app/shared/models/generic-form';
import { FormStructure, FormValidation } from '@app/shared/models/form-structure';
import { INPUT_TYPES, TEXT_INPUT_TYPES } from '@app/shared/constants/shared.contants';

@Component({
  selector: 'app-form-generator',
  standalone: false,
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.scss',
})
export class FormGeneratorComponent {
  @Input() formStructure: FormStructure[] = [];
  @Input() formDetails!: GenericForm;
  @Output() moveBack = new EventEmitter<void>();
  @Output() formData = new EventEmitter<unknown>();

  formLayoutCols = 'grid md:grid-cols-4 sm:grid-cols-1 gap-10 gap-y-5';
  inputTypes = INPUT_TYPES;
  textInputTypes = TEXT_INPUT_TYPES;

  dynamicForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    let formGroup: Record<string, any> = {};
    this.formStructure.forEach((control) => {
      let controlValidators: Validators[] = [];

      if (control.validations) {
        control.validations.forEach((validation: FormValidation) => {
          if (validation.validator === 'required') controlValidators.push(Validators.required);
          if (validation.validator === 'min')
            controlValidators.push(Validators.min(validation.value || 0));
          if (validation.validator === 'max')
            controlValidators.push(Validators.max(validation.value || 0));
          if (validation.validator === 'pattern' && validation.pattern) {
            controlValidators.push(Validators.pattern(validation.pattern));
          }
        });
      }

      formGroup[control.name] = [control.value || '', controlValidators];
    });

    this.dynamicForm = this.fb.group(formGroup);
  }

  getErrorMessage(control: any) {
    const formControl = this.dynamicForm.get(control.name);

    if (!formControl) {
      return '';
    }

    for (let validation of control.validations) {
      if (formControl.hasError(validation.name)) {
        return validation.message;
      }
    }

    return '';
  }

  displaySliderValue(value: number): string {
    return value.toString();
  }

  getControlValue(name: string) {
    return this.dynamicForm.controls[name].value;
  }

  onValueChange(event: MatSelectChange, data?: GenericOption[]) {
    if (data && event) {
      const selectedOption = data.filter((item) => item.value === event.value);
      if (selectedOption && selectedOption.length) {
        const dependents = selectedOption[0]?.dependents;
        if (dependents) {
          const { value, name } = dependents;
          this.dynamicForm.controls[name].setValue(value);
        }
      }
    }
  }

  onMoveBack() {
    this.moveBack.emit();
  }

  onSubmit() {
    if (!this.dynamicForm.valid) {
      this.dynamicForm.markAllAsTouched();
      this.notificationService.showMessage(SEVERITY.ERROR, 'The form is not valid, please check!');
      return;
    }
    this.formData.emit(this.dynamicForm.value);
  }
}
