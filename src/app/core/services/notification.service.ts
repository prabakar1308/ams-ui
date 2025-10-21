import { Injectable } from '@angular/core';
import { CORE_CONSTANTS, SEVERITY } from '@app/core/core.contants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly toastr: ToastrService) {}

  showMessage(type: SEVERITY, message: string, header?: string, duration?: number) {
    const opt = {
      timeOut: duration || CORE_CONSTANTS.TOASTER_LIVE_TIME,
    };
    switch (type) {
      case SEVERITY.SUCCESS:
        this.toastr.success(message, header, opt);
        break;

      case SEVERITY.INFO:
        this.toastr.info(message, header, opt);
        break;

      case SEVERITY.WARN:
        this.toastr.warning(message, header, opt);
        break;

      case SEVERITY.ERROR:
        this.toastr.error(message, header, opt);
        break;

      default:
        break;
    }
  }
}
