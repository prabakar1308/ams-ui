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
  dateValue = { startDate: new Date(), endDate: new Date() };

  ngOnInit() {
    const currentDate = new Date();
    const thirtyDaysBefore = new Date();
    thirtyDaysBefore.setDate(currentDate.getDate() - 30);
    this.dateValue = { startDate: thirtyDaysBefore, endDate: currentDate };
  }

  onIndexChange(index: number) {
    this.selectedIndex = index;
  }

  dateChange(event: unknown): void {
    const date: { start: string; end: string } = event as { start: string; end: string };
    if (date) {
      const { start, end } = date;
      this.dateValue = { startDate: new Date(start), endDate: new Date(end) };
    }
  }

  generateReport(): void {
    console.log('g');
  }
}
