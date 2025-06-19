import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class DateRangePickerService {
    public applyDisabled = new BehaviorSubject(false);
    public customPresets: string[] = [];
}
