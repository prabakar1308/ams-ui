import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';
import {
  FM_USER,
  FM_USER_NAVBAR_ITEMS,
  NAVBAR_ITEMS,
  USER,
  USER_NAVBAR_ITEMS,
} from '@app/core/core.contants';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() loggedIn = false;
  @Output() logout = new EventEmitter<unknown>();
  private unSubscribe = new Subject<void>();
  activeUrl = '';
  userName = '';
  navbarItems = NAVBAR_ITEMS;

  constructor(
    private router: Router,
    private authFacadeService: AuthFacadeService,
    private dialog: MatDialog,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.unSubscribe),
      )
      .subscribe((routeChange: NavigationEnd) => {
        this.activeUrl = routeChange.url;
      });

    this.authFacadeService.userData$.pipe(takeUntil(this.unSubscribe)).subscribe((userData) => {
      if (userData) {
        this.userName = userData.userName || '';
        if (userData.userRole === FM_USER) {
          this.navbarItems = FM_USER_NAVBAR_ITEMS;
        } else if (userData.userRole === USER) {
          this.navbarItems = USER_NAVBAR_ITEMS;
        } else {
          this.navbarItems = NAVBAR_ITEMS;
        }
      }
    });
  }

  ngOnInit(): void {
    this.activeUrl = this.router.url;
  }

  logoutButton(): void {
    const data = {
      title: 'Logout Confirmation',
      message: 'Are you sure you want to logout?',
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.logout.emit(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
