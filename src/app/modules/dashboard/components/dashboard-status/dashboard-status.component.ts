import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTION_ITEMS, PRODUCTION_ITEMS_ID } from '@app/dashboard/constants/dashboard';
import { ProductionItem } from '@app/dashboard/models/dashboard';
import { DashboardFacadeService } from '@app/dashboard/services/dashboard-facade.service';
import { TANK_TYPES, WORKSHEET_STATUS } from '@app/shared/constants/shared.contants';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
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
  constructor(
    private dashboardFacadeService: DashboardFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private router: Router,
  ) {}

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
                link: '/worksheet/harvest',
                queryParams: { id: '1' },
                class: 'text-yellow-600',
              });
              item.values.push({
                count: res.liveCompleted,
                unit: 'Millions',
                link: '/worksheet/transit',
                class: 'text-green-600',
              });
              break;
            case PRODUCTION_ITEMS_ID.FROZEN_CUPS:
              item.values.push({
                count: res.frozenAvailable,
                unit: 'Frozen Cups',
                link: '/worksheet/harvest',
                queryParams: { id: '2' },
                class: 'text-yellow-600',
              });
              item.values.push({
                count: res.frozenCompleted,
                unit: 'Frozen Cups',
                link: '/worksheet/transit',
                class: 'text-green-600',
              });
              break;
            case PRODUCTION_ITEMS_ID.RESTOCK:
              item.values.push({
                count: res.restock,
                unit: 'Millions',
                link: '/worksheet/restock',
                class: 'text-teal-600',
              });
              break;
            case PRODUCTION_ITEMS_ID.MACHINERY:
              res.instockMachinery.forEach((machinery) => {
                item.values.push({
                  count: machinery.totalInputCount,
                  unit: machinery.inputUnitName,
                  link: '',
                  click: TANK_TYPES.MACHINERY,
                  class: 'text-cyan-600',
                });
              });
              break;
            case PRODUCTION_ITEMS_ID.CONVENTIONAL:
              res.instockConventional.forEach((conv) => {
                item.values.push({
                  count: conv.totalInputCount,
                  unit: conv.inputUnitName,
                  link: '',
                  click: TANK_TYPES.CONVENTIONAL,
                  class: 'text-cyan-600',
                });
              });
              break;
          }
          return item;
        });
      });
  }

  navigateItem(id: number): void {
    this.sharedFacadeService.updateWorksheetFilter({
      tankTypeId: id,
      statusId: WORKSHEET_STATUS.IN_STOCKING,
      userId: 0,
      harvestTypeId: 0,
    });
    this.router.navigate(['/worksheet']);
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
