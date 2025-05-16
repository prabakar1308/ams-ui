import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { SEVERITY } from '@app/core/core.contants';
import { NotificationService } from '@app/core/services/notification.service';
import { Depedent, GenericForm, GenericOption } from '@app/shared/models/generic-form';
import { FormStructure, FormValidation } from '@app/shared/models/form-structure';
import { INPUT_TYPES, TEXT_INPUT_TYPES } from '@app/shared/constants/shared.contants';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-generator',
  standalone: false,
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.scss',
})
export class FormGeneratorComponent implements OnInit, OnDestroy {
  @Input() formStructure: FormStructure[] = [];
  @Input() formDetails!: GenericForm;
  @Output() moveBack = new EventEmitter<void>();
  @Output() formData = new EventEmitter<unknown>();
  @Output() formValueChange = new EventEmitter<unknown>();

  private unSubscribe = new Subject<void>();
  formLayoutCols = 'grid md:grid-cols-4 sm:grid-cols-1 gap-10 gap-y-5';
  inputTypes = INPUT_TYPES;
  textInputTypes = TEXT_INPUT_TYPES;
  dynamicForm!: FormGroup;
  previousValue: unknown;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formStructure'] && !changes['formStructure'].firstChange) {
      this.initializeForm(); // Reinitialize the form when formStructure changes
    }
  }

  private initializeForm(): void {
    let formGroup: Record<string, any> = {};
    this.formStructure.forEach((control) => {
      // if (control.type !== INPUT_TYPES.DIVIDER) {
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

      formGroup[control.name] = [
        { value: control.value || '', disabled: control.hide },
        controlValidators,
      ];
      // }
    });

    this.dynamicForm = this.fb.group(formGroup);

    // Add subscriptions once the form is initialized
    this.formStructure.forEach((control) => {
      if (control.callback) {
        this.dynamicForm.controls[control.name].valueChanges
          .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
          .subscribe(() => {
            this.previousValue = this.dynamicForm.value[control.name];
          });
      }
    });
  }

  isFormControlActive(name: string) {
    return !this.dynamicForm.get(name)?.disabled;
  }

  getErrorMessage(control: any): string {
    const formControl = this.dynamicForm.get(control.name);

    if (!formControl || !formControl.errors) {
      return '';
    }

    if (control.validations) {
      for (let validation of control.validations) {
        if (formControl.hasError(validation.name)) {
          return validation.message;
        }
      }
    }

    if (control.errorMessages) {
      for (let errorKey in control.errorMessages) {
        if (formControl.hasError(errorKey)) {
          return control.errorMessages[errorKey];
        }
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

  onTextChange(event: Event, parentName: string, dependents?: Depedent[]) {
    const inputValue = Number((event.target as HTMLInputElement).value || 0);
    this.executeDependentLogic(dependents ?? [], parentName, inputValue);
  }

  onValueChange(event: number, parentName: string, data?: GenericOption[]) {
    if (data && event) {
      const selectedOption = data.filter((item) => item.value === event);
      if (selectedOption && selectedOption.length) {
        const { dependents, hide } = selectedOption[0];
        this.executeDependentLogic(dependents ?? [], parentName, event);

        // hide controls dynamically
        Object.keys(this.dynamicForm.controls).forEach((key) => {
          const filteredNames = hide && hide.length ? hide.filter((name) => name === key) : [];
          if (filteredNames.length) this.dynamicForm.controls[key].disable();
          else {
            if (this.formStructure) {
              const control = this.formStructure.find((control) => control.name === key);
              if (control && control.hide) this.dynamicForm.controls[key].disable();
              else this.dynamicForm.controls[key].enable();
            }
          }
        });
      }
    }
  }

  executeDependentLogic(dependents: Depedent[], parentName: string, parentValue: number) {
    if (dependents?.length) {
      dependents.forEach((dependent) => {
        const { value, name, askReset, validations } = dependent;

        if (askReset) {
          const data = {
            title: 'Reset',
            message: `The form will be reset. Do you want to proceed?`,
          };
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });
          dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
            if (isConfirmed) {
              this.dynamicForm.controls[name].setValue(value);
              this.dynamicForm.controls[name].markAsUntouched();
              this.formValueChange.emit({ name: parentName, value: parentValue });
            } else this.dynamicForm.controls[parentName].setValue(this.previousValue);
          });
        } else if (validations && validations.length) {
          const updatedValue = parseInt(String(value)) || parentValue;
          this.dynamicForm.controls[name].clearValidators();
          if (updatedValue) {
            validations.forEach((validation) => {
              const { validator } = validation;
              // TODO: move validator logic to a separate function
              if (validator === 'required') {
                this.dynamicForm.controls[name].addValidators([Validators.required]);
              } else if (validator === 'max') {
                this.dynamicForm.controls[name].addValidators([Validators.max(updatedValue)]);
              } else if (validator === 'min') {
                this.dynamicForm.controls[name].addValidators([Validators.min(updatedValue)]);
              }
              this.dynamicForm.controls[name].updateValueAndValidity();
            });
          } else {
            this.dynamicForm.controls[name].clearValidators();
            this.dynamicForm.controls[name].updateValueAndValidity();
          }
        } else this.dynamicForm.controls[name].setValue(value);
      });
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

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
