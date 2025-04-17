import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  serviceCount = 0;
  constructor(private loaderService: LoaderService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.serviceCount++;
    this.loaderService.show(); // Show loader on request start
    return next.handle(req).pipe(
      finalize(() => {
        this.serviceCount--;
        if (this.serviceCount === 0) this.loaderService.hide();
      }) // Hide loader on request completion
    );
  }
}
