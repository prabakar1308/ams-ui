import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { MASTER_TITLE } from '../master-details/master.config';
import { MasterDetailsComponent } from '../master-details/master-details.component';

@Component({
  selector: 'app-master-home',
  standalone: false,
  templateUrl: './master-home.component.html',
  styleUrl: './master-home.component.scss',
})
export class MasterHomeComponent implements OnInit {
  masterTitle = MASTER_TITLE;
  tabIndex: number = 0;
  @ViewChild(MasterDetailsComponent) masterDetailsComp!: MasterDetailsComponent;
  constructor(private sharedService: SharedFacadeService) {}

  ngOnInit() {
    this.sharedService.getMasterData();
  }

  onTabChange(event: any) {
    // Handle tab change if needed
    this.tabIndex = event.index;
    console.log('Selected Tab Index:', event.index);
    if (this.masterDetailsComp) {
      this.masterDetailsComp.init();
    }
  }
}
