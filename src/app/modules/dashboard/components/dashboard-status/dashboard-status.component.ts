import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-status',
  standalone: false,
  templateUrl: './dashboard-status.component.html',
  styleUrl: './dashboard-status.component.scss',
})
export class DashboardStatusComponent {
  productionItems = [
    {
      icon: 'shopping_cart_checkout',
      title: 'Restock',
      description: '16 Nos',
      link: '',
    },
    {
      icon: 'live_tv',
      title: 'Live Artmenia',
      description: '16 Tins | 10 Tins',
      link: '',
    },
    {
      icon: 'emoji_food_beverage',
      title: 'Frozen Cups',
      description: '16 Tins | 60 Cups',
      link: '',
    },
    {
      icon: 'delete_sweep',
      title: 'Total tins',
      description: '100 Tins | 90 Tins',
      link: '',
    },
    {
      icon: 'view_timeline',
      title: 'Total Guaranted',
      description: '16 Nos',
      link: '',
    },
  ];
  dateValue: string = '';

  dateChange(event: unknown): void {
    const date: { start: string; end: string } = event as { start: string; end: string };
    console.log(date);
    if (date) {
      const { start, end } = date;
      this.dateValue = start;
    }
  }
}
