import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';

@Component({
  selector: 'app-master-home',
  standalone: false,
  templateUrl: './master-home.component.html',
  styleUrl: './master-home.component.scss',
})
export class MasterHomeComponent implements OnInit, OnDestroy {
  constructor(private sharedService: SharedFacadeService) {}

  ngOnInit() {
    this.sharedService.getMasterData();
  }

  ngOnDestroy() {
    this.sharedService.getMasterData();
  }
}
