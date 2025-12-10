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
  @Input() disableFutureDates: boolean | undefined = false;
  @Input() value: Date | null = null;
  today = new Date();
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
    if (this.date) {
      // Update only the time part of this.date
      const selected = event.value;
      this.date.setHours(
        selected.getHours(),
        selected.getMinutes(),
        selected.getSeconds() || 0,
        selected.getMilliseconds() || 0,
      );
    } else {
      this.date = event.value;
    }
    this.emitChange();

    // Remove focus from the time input after selection
    setTimeout(() => {
      const timeInput = document.querySelector('.mat-timepicker-input');
      console.log(timeInput);
      if (timeInput) {
        (timeInput as HTMLElement).blur();
      }
    }, 0);
  }

  emitChange() {
    this.onChange(this.date);
    this.onTouched();
  }

  get maxTime(): Date | null {
    if (!this.date) return null;
    const today = new Date();
    // Check if selected date is today
    if (
      this.date.getFullYear() === today.getFullYear() &&
      this.date.getMonth() === today.getMonth() &&
      this.date.getDate() === today.getDate()
    ) {
      return today;
    }
    return null;
  }

  disableTime(): boolean {
    if (this.date) {
      const today = new Date();
      // Remove time part for comparison
      const selected = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
      const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      // Disable time if selected date is in the future
      return selected > now;
    }
    return false;
  }
}
