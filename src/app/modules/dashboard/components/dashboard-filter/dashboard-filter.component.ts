import { Component } from '@angular/core';
import { StatusDetails } from '@shared/models/status-details';
import { SharedFacadeService } from '@shared/service/shared-facade.service';
import { Output, EventEmitter } from '@angular/core';
import { UserDetails } from '@shared/models/user-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-filter',
  standalone: false,
  templateUrl: './dashboard-filter.component.html',
  styleUrl: './dashboard-filter.component.scss'
})
export class DashboardFilterComponent {
  @Output() changeStatus = new EventEmitter<number>();
  @Output() changeUser = new EventEmitter<number>();
  @Output() changeTankType = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();
  selectedUser: number = 0;
  userDetails: UserDetails[] | null = null;
  
  selectedStatus: number = 0;
  statusDetails: StatusDetails[] | null = null;
  constructor(private sharedFacade: SharedFacadeService, private router: Router) { }
  ngOnInit() {
    this.sharedFacade.getStatusData();
   
    this.sharedFacade.statusData.subscribe((data) => {
      this.statusDetails = data;
      console.log('statusDetails', this.statusDetails);
    });

    this.sharedFacade.getUserDetails();
    this.sharedFacade.userDerails.subscribe((data) => {
     this.userDetails = data;
      console.log('userDetails', this.userDetails);
    });
  }

  onStatusChange(event: any) {
    this.selectedStatus = event;
    this.changeStatus.emit(this.selectedStatus);
    console.log('Selected status:', this.selectedStatus);
  }
  onUserChange(event: any) {
    this.selectedUser = event;
    this.changeUser.emit(this.selectedUser);
    console.log('Selected user:', this.selectedUser);
  }

  onTankTypeChange(event: any) {
  this.changeTankType.emit(event);
    console.log('Selected tank type:', event);
  }
  
  onRefresh() {
 this.refresh.emit();
  }
 
  onCreateWorksheet(){
    this.router.navigate(['/worksheet']);
  }
}
