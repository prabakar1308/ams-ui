import { Component, OnInit } from '@angular/core';
import { PRODUCTION_ITEMS, PRODUCTION_ITEMS_ID } from '@app/dashboard/constants/dashboard';
import { ProductionItem } from '@app/dashboard/models/dashboard';
import { DashboardFacadeService } from '@app/dashboard/services/dashboard-facade.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-status',
  standalone: false,
  templateUrl: './dashboard-status.component.html',
  styleUrl: './dashboard-status.component.scss',
})
export class DashboardStatusComponent implements OnInit {
  private unSubscribe = new Subject<void>();
  productionItems: ProductionItem[] = PRODUCTION_ITEMS;
  dateValue: string = '';

  constructor(private dashboardFacadeService: DashboardFacadeService) {}

  ngOnInit(): void {
    this.dashboardFacadeService.getProductionData();
    this.dashboardFacadeService.productionCount$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res) => {
        this.productionItems = this.productionItems.map((item) => {
          item.values = [];
          switch (item.id) {
            case PRODUCTION_ITEMS_ID.LIVE_ARTEMIA:
              item.values.push({
                count: res.liveAvailable,
                unit: 'Millions',
                link: '',
                class: 'text-yellow-600',
              });
              item.values.push({
                count: res.liveCompleted,
                unit: 'Millions',
                link: '/reports',
                class: 'text-green-600',
              });
              break;
            case PRODUCTION_ITEMS_ID.FROZEN_CUPS:
              item.values.push({
                count: res.frozenAvailable,
                unit: 'Frozen Cups',
                link: '',
                class: 'text-yellow-600',
              });
              item.values.push({
                count: res.frozenCompleted,
                unit: 'Frozen Cups',
                link: '',
                class: 'text-green-600',
              });
              break;
            case PRODUCTION_ITEMS_ID.RESTOCK:
              item.values.push({
                count: res.restock,
                unit: 'Millions',
                link: '',
                class: 'text-teal-600',
              });
              break;
            case PRODUCTION_ITEMS_ID.MACHINERY:
              res.instockMachinery.forEach((machinery) => {
                item.values.push({
                  count: machinery.totalInputCount,
                  unit: machinery.inputUnitName,
                  link: '',
                  class: 'text-cyan-600',
                });
              });
              break;
            case PRODUCTION_ITEMS_ID.CONVENTIONAL:
              res.instockConventional.forEach((machinery) => {
                item.values.push({
                  count: machinery.totalInputCount,
                  unit: machinery.inputUnitName,
                  link: '',
                  class: 'text-cyan-600',
                });
              });
              break;
          }
          return item;
        });
      });
  }

  dateChange(event: unknown): void {
    const date: { start: string; end: string } = event as { start: string; end: string };
    console.log(date);
    if (date) {
      const { start, end } = date;
      this.dateValue = start;
    }
  }
}
