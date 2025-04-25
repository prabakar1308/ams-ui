import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  value: number | null = null;
  options = [
    {label: 'None', value: null},
    {label: 'Juddy', value: 1},
    {label: 'Tiago', value: 2},
    {label: 'Sid', value: 3},
  ];

  status: number | null = null;
  statusoptions = [
    {label: 'Open/Free', status: 1},
    {label: 'In Stocking', status: 2},
    {label: 'Ready for Stocking', status: 3},
    {label: 'Ready for Harvest', status: 4},
  ];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    // this.dashboardService.getDashboardData().subscribe((data) => {
    //   console.log(data);
    // });

  }

}
