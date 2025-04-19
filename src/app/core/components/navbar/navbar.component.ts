import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

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
  // TODO: move this to a common place
  navbarItems = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Worksheet', route: '/worksheet' },
    { name: 'Master', route: '/master' },
    { name: 'Reports', route: '/reports' },
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.unSubscribe)
      )
      .subscribe((routeChange: NavigationEnd) => {
        this.activeUrl = routeChange.url;
      });
  }

  ngOnInit(): void {
    this.activeUrl = this.router.url;
  }

  logoutButton(): void {
    this.logout.emit(true);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
