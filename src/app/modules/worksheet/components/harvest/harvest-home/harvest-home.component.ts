import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { HarvestFilter } from '@app/shared/models/shared-state';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { HarvestDetails } from '@app/worksheet/models/harvest-details';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';

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
      let filter: HarvestFilter = {
        unitId: this.unitId,
        statusIds: ['A', 'P'],
      };
      this.worksheetFacadeService.getHarvests(filter);
    });
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
}
