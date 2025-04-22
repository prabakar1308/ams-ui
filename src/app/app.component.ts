import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';
import { APP_DEFAULT_ROUTE } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ams-ui';
  userLoggedIn = false;

  constructor(
    private router: Router,
    private authFacadeService: AuthFacadeService
  ) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.userLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.authFacadeService.userSubject.subscribe((userData) => {
      if (userData) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.authFacadeService.userLoginSucess(JSON.parse(userData));
      this.authFacadeService.userSubject.next(JSON.parse(userData));
      this.router.navigate([APP_DEFAULT_ROUTE]);
    }
  }

  onLogout(): void {
    this.userLoggedIn = false;
    this.authFacadeService.logout();
    this.router.navigate(['/login']);
  }
}
