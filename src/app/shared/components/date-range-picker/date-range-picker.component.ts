import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { CustomHeaderComponent } from '../custom-header/custom-header.component';
import { DateRangePickerService } from './date-range-picker.service';
import { CUSTOM_PRESETS } from '@app/shared/constants/shared.contants';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  providers: [DateRangePickerService],
  standalone: false,
})
export class DateRangePickerComponent implements OnInit {
  @Input() set value(value: any) {
    if (!value) {
      this.range.setValue({
        start: null,
        end: null,
      });
    } else {
      this.range.setValue({
        start: value.startDate,
        end: value.endDate,
      });
    }
  }
  @Input() customPresets: string[] = CUSTOM_PRESETS;
  @Input() label: string = 'Enter a date range';
  @Output() selectionChange = new EventEmitter<unknown>();
  CustomHeaderComponent = CustomHeaderComponent;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  isTouchUIActivated = false;

  constructor(public pickerService: DateRangePickerService) {}

  ngOnInit(): void {
    this.pickerService.customPresets = this.customPresets;
  }

  applySelectedDate(picker: MatDateRangePicker<Date>): void {
    this.range.setValue({
      start: (picker.datepickerInput as MatDateRangeInput<Date>)?.value?.start ?? null,
      end: (picker.datepickerInput as MatDateRangeInput<Date>)?.value?.end ?? null,
    });
    this.selectionChange.emit(this.range.value);
    picker.close();
  }
}
