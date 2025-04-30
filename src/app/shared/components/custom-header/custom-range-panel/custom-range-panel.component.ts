import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-custom-range-panel',
  templateUrl: './custom-range-panel.component.html',
  styleUrls: ['./custom-range-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CustomRangePanelComponent<D> {
  // list of range presets we want to provide:
  @Input() customPresets: string[] = [];
  @HostBinding('class.touch-ui')
  readonly isTouchUi;
  selectedRange = '';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private dateAdapter: DateAdapter<D>,
    private picker: MatDateRangePicker<D>,
    private calendar: MatCalendar<D>,
    cdr: ChangeDetectorRef,
  ) {
    this.isTouchUi = this.picker.touchUi;
    calendar.stateChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      cdr.markForCheck();
      this.loadSelectedRange();
    });
  }

  ngOnInit() {
    this.loadSelectedRange();
  }

  loadSelectedRange() {
    this.selectedRange = '';
    for (const preset of this.customPresets) {
      if (this.isSelectdeRange(preset)) {
        this.selectedRange = preset;
        break;
      }
    }
  }

  // called when user selects a range preset:
  selectRange(rangeName: string): void {
    if (rangeName === 'Custom') return;
    const [start, end] = this.calculateDateRange(rangeName);
    (this.calendar.selected as any).start = start;
    (this.calendar.selected as any).end = end;
    this.calendar.updateTodaysDate();
    this.calendar.activeDate = start;
    this.calendar.activeDate = end;
    //this.picker.select(start);
    //this.picker.select(end);
    //this.picker.close();
  }

  private calculateDateRange(rangeName: string) {
    const today = this.today;
    const year = this.dateAdapter.getYear(today);

    switch (rangeName) {
      case 'Today':
        return [today, today];
      case 'Yesterday and today': {
        const start = this.dateAdapter.addCalendarDays(today, -1);
        return [start, today];
      }
      case 'Yesterday': {
        const start = this.dateAdapter.addCalendarDays(today, -1);
        return [start, start];
      }
      case 'Last 7 days': {
        const start = this.dateAdapter.addCalendarDays(today, -6);
        return [start, today];
      }
      case 'Last 30 days': {
        const start = this.dateAdapter.addCalendarDays(today, -29);
        return [start, today];
      }
      case 'This month': {
        return this.calculateMonth(today);
      }
      case 'Previous month': {
        const thisDayLastMonth = this.dateAdapter.addCalendarMonths(today, -1);
        return this.calculateMonth(thisDayLastMonth);
      }
      case 'Tomorrow': {
        const start = this.dateAdapter.addCalendarDays(today, 1);
        return [start, start];
      }
      case 'Next 7 days': {
        const end = this.dateAdapter.addCalendarDays(today, 6);
        return [today, end];
      }
      case 'Next 30 days': {
        const end = this.dateAdapter.addCalendarDays(today, 29);
        return [today, end];
      }
      case 'Custom': {
        const selectedRange: any = this.calendar.selected;
        return [selectedRange.start, selectedRange.end];
      }
      default:
        throw new Error(`Unsupported range name: ${rangeName}`);
    }
  }

  private calculateMonth(forDay: D): [start: D, end: D] {
    const year = this.dateAdapter.getYear(forDay);
    const month = this.dateAdapter.getMonth(forDay);
    const start = this.dateAdapter.createDate(year, month, 1);
    const end = this.dateAdapter.addCalendarDays(
      start,
      this.dateAdapter.getNumDaysInMonth(forDay) - 1,
    );
    return [start, end];
  }

  private calculateWeek(forDay: D): [start: D, end: D] {
    const deltaStart = this.dateAdapter.getFirstDayOfWeek() - this.dateAdapter.getDayOfWeek(forDay);
    const start = this.dateAdapter.addCalendarDays(forDay, deltaStart);
    const end = this.dateAdapter.addCalendarDays(start, 6);
    return [start, end];
  }

  private get today(): D {
    const today = this.dateAdapter.today(); //.getValidDateOrNull(new Date());
    if (today === null) {
      throw new Error('date creation failed');
    }
    return today;
  }
  get selectedDateRange() {
    const selectedRange: any = this.calendar.selected;
    let displayText = '';
    if (selectedRange.start !== null)
      displayText += new Date(String(selectedRange.start)).toLocaleDateString();
    if (selectedRange.end !== null)
      displayText += ' - ' + new Date(String(selectedRange.end)).toLocaleDateString();
    return displayText;
  }

  ngOnDestroy() {
    this.destroy$.next(); // will trigger unsubscription in takeUntil
  }

  isSelectdeRange(rangeName: string) {
    const [start, end] = this.calculateDateRange(rangeName);
    const selectedRange: any = this.calendar.selected;
    return (
      selectedRange.start !== null &&
      selectedRange.end !== null &&
      new Date(String(selectedRange.start)).toDateString() ===
        new Date(String(start)).toDateString() &&
      new Date(String(selectedRange.end)).toDateString() === new Date(String(end)).toDateString()
    );
  }
}
