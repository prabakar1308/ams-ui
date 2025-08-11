import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { MatTimepickerSelected } from '@angular/material/timepicker';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class DateTimePickerComponent implements ControlValueAccessor {
  @Input() label: string = 'Select date';
  @Input() disabled = false;
  @Input() value: Date | null = null;

  date: Date | null = null;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
      this.date = value ? new Date(value) : new Date();
    } else {
      this.date = new Date();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange(event: any) {
    this.date = event.value;
    this.emitChange();
  }

  onTimeSelected(event: MatTimepickerSelected<Date>) {
    this.date = event.value;
    this.emitChange();
  }

  emitChange() {
    this.onChange(this.date);
    this.onTouched();
  }
}
