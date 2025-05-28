import { Component } from '@angular/core';
import { ReportFacadeService } from '../../services/report-facade.service';
import { UNIT_IDS } from '@app/shared/constants/shared.contants';

@Component({
  selector: 'app-report-home',
  standalone: false,
  templateUrl: './report-home.component.html',
  styleUrl: './report-home.component.scss',
})
export class ReportHomeComponent {
  constructor(private reportFacadeService: ReportFacadeService) {}
  unitIds = UNIT_IDS;
  selectedIndex = 0;

  onIndexChange(index: number) {
    this.selectedIndex = index;
  }
}
