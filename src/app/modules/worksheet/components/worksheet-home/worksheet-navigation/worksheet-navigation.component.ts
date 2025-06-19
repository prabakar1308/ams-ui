import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worksheet-navigation',
  standalone: false,
  templateUrl: './worksheet-navigation.component.html',
  styleUrl: './worksheet-navigation.component.scss',
})
export class WorksheetNavigationComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<WorksheetNavigationComponent>>(MatBottomSheetRef);
  private router = inject(Router);

  navigationItems = [
    { label: 'Worksheet', description: 'Current Page', route: '/worksheet' },
    { label: 'Harvest', description: 'List of active harvest items', route: '/worksheet/harvest' },
    {
      label: 'Restocking',
      description: 'List of active restock items',
      route: '/worksheet/restock',
    },
    { label: 'Transit', description: 'List of active transit items', route: '/worksheet/transit' },
  ];

  openLink(event: MouseEvent, route: string): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
    this.router.navigate([route]);
  }
}
