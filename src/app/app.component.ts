import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ams-ui';
  userLoggedIn = false;
  private unSubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private authFacadeService: AuthFacadeService,
    private sharedFacadeService: SharedFacadeService,
  ) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.userLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.authFacadeService.userSubject
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((userData) => {
        if (userData) {
          this.userLoggedIn = true;
          setTimeout(() => {
            this.sharedFacadeService.getMasterData();
          }, 2000);
        } else {
          this.userLoggedIn = false;
        }
      });

    const userData = localStorage.getItem('userData');
    if (userData && !this.userLoggedIn) {
      this.authFacadeService.userLoginSucess(JSON.parse(userData));
      this.authFacadeService.userSubject.next(JSON.parse(userData));
      // this.router.navigate([APP_DEFAULT_ROUTE]);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: any) {
    alert(event);
    // localStorage.clear();
  }

  onLogout(): void {
    this.userLoggedIn = false;
    this.authFacadeService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
