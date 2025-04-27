import { Component } from '@angular/core';
import { DashboardFacadeService } from '@modules/dashboard/services/dashboard-facade.service';
import { DashboardResponse } from '@modules/dashboard/models/dashboard-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  

  dashboardData: DashboardResponse[] | null = [];

  constructor(private dashboardFacade: DashboardFacadeService) { }

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    this.dashboardFacade.getDashboardData(0,0,0);
   
    this.dashboardFacade.dashboardData.subscribe((data) => {
      this.dashboardData = data;
    });
  }

  onStatusChange(event: any) {
    console.log('Selected status:', event);
    this.dashboardFacade.getDashboardData(0,0,event);
    this.dashboardFacade.dashboardData.subscribe((data) => {
      this.dashboardData = data;
    });

}
  onUserChange(event: any) {
    console.log('Selected user:', event);
    this.dashboardFacade.getDashboardData(event,0,0);
    this.dashboardFacade.dashboardData.subscribe((data) => {
      this.dashboardData = data;
    });
  }

  onTankTypeChange(event: string){
    this.loadAllData();
    if (event !== 'All') {
      this.dashboardData = this.dashboardData?.filter(x => x.worksheet?.tankType?.value === event) == null ? [] : this.dashboardData?.filter(x => x.worksheet?.tankType?.value === event);
    }
 
  }

}
