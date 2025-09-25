import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { HarvestFilter } from '@app/shared/models/shared-state';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { APP_DEFAULT_PAGE_INDEX, APP_DEFAULT_PAGE_SIZE } from 'app/app.constants';
import { init } from 'echarts/core';

@Component({
  selector: 'app-harvest-home',
  standalone: false,
  templateUrl: './harvest-home.component.html',
  styleUrl: './harvest-home.component.scss',
})
export class HarvestHomeComponent {
  unitId: number = 1;
  selectedTab = 0; // Default selected tab index
  searchText = '';
  constructor(
    private worksheetFacadeService: WorksheetFacadeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.selectedTab = Number(params['id']) - 1; // Assuming tab index is id - 1
        this.unitId = Number(params['id']);
      }
      this.initializeData();
    });
  }

  initializeData() {
    let filter: HarvestFilter = {
      unitId: this.unitId,
      statusIds: ['A', 'P'],
      page: APP_DEFAULT_PAGE_INDEX,
      limit: APP_DEFAULT_PAGE_SIZE,
    };
    this.worksheetFacadeService.getHarvests(filter);
  }

  loadData(event: MatTabChangeEvent) {
    this.unitId = event.index + 1; // Assuming unitId is based on the index of the tab
    let filter: HarvestFilter = {
      unitId: event.index + 1,
      statusIds: ['A', 'P'],
    };
    //Need to check
    this.worksheetFacadeService.getHarvests(filter);
  }

  onClickBack() {
    this.router.navigate(['/worksheet']);
  }

  onRefresh() {
    this.initializeData();
    this.worksheetFacadeService.getMonitoringCount();
  }
}
