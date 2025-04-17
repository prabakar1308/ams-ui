import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormStructure } from '../../models/form-structure';
import { formConfig } from './form.config';
import { INPUT_TYPES, TEXT_INPUT_TYPES } from '../../constants/shared.contants';

@Component({
  selector: 'app-form-generator',
  standalone: false,
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.scss'
})
export class FormGeneratorComponent {
  formStructure: FormStructure[] = formConfig;
  formLayoutCols = window.innerWidth < 768 ? 1 : 2;
  inputTypes = INPUT_TYPES;
  textInputTypes = TEXT_INPUT_TYPES;

  dynamicForm: FormGroup;

  constructor(private fb: FormBuilder) {
    let formGroup: Record<string, any> = {};
    this.formStructure.forEach((control) => {
      let controlValidators: Validators[] = [];

      if (control.validations) {
        ``;
        control.validations.forEach(
          (validation: {
            name: string;
            validator: string;
            message: string;
          }) => {
            if (validation.validator === 'required')
              controlValidators.push(Validators.required);
            if (validation.validator === 'email')
              controlValidators.push(Validators.email);
            // Add more built-in validators as needed
          }
        );
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

  onSubmit() {
    if (!this.dynamicForm.valid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }
    console.log(this.dynamicForm.value);
  }
}
