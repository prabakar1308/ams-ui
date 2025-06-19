import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateRangePickerService } from '../date-range-picker/date-range-picker.service';

@Component({
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CustomHeaderComponent<D> implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private calendar: MatCalendar<D>, // calendar instance of picker
    cdr: ChangeDetectorRef,
    public pickerService: DateRangePickerService,
  ) {
    // make sure your header stays in sync with the calendar:
    calendar.stateChanges
      .pipe(takeUntil(this.destroy$)) // unsubscribe when destroyed
      .subscribe(() => {
        cdr.markForCheck();
        setTimeout(() =>
          this.pickerService.applyDisabled.next(
            !(this.calendar.selected as any).start || !(this.calendar.selected as any).end,
          ),
        );
      });
    //this.headerService.subj$.subscribe((res: string[]) => console.log(res));
  }
  ngOnDestroy(): void {
    this.destroy$.next(); // will trigger unsubscription in takeUntil
  }
}
