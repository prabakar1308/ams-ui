import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardTank } from '@app/dashboard/models/dashboard-tank';
import { DashboardFacadeService } from '@app/dashboard/services/dashboard-facade.service';
import { TANK_TYPES } from '@app/shared/constants/shared.contants';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-tanks',
  standalone: false,
  templateUrl: './dashboard-tanks.component.html',
  styleUrl: './dashboard-tanks.component.scss',
})
export class DashboardTanksComponent implements OnInit, OnDestroy {
  private unSubscribe = new Subject<void>();
  machineryTanks: DashboardTank[] = [];
  conventionalTanks: DashboardTank[] = [];
  tankTypes = TANK_TYPES;
  constructor(
    private router: Router,
    private dashboardFacadeService: DashboardFacadeService,
    private sharedFacadeService: SharedFacadeService,
  ) {}

  ngOnInit() {
    this.dashboardFacadeService.getMachineryTanks();
    this.dashboardFacadeService.getConventionalTanks();

    this.dashboardFacadeService.machineryTanks$
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((tanks) => (this.machineryTanks = tanks));

    this.dashboardFacadeService.conventionalTanks$
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((tanks) => (this.conventionalTanks = tanks));
  }

  onTankSelection(tank: DashboardTank, tankTypeId: number): void {
    this.sharedFacadeService.updateWorksheetFilter({
      tankTypeId,
      statusId: tank.statusId,
      userId: 0,
      harvestTypeId: 0,
    });
    this.router.navigate(['/worksheet']);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
