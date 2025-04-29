import { Component } from '@angular/core';
import { ActiveWorksheet } from '@modules/worksheet/models/active-worksheet';
import { WorksheetFacadeService } from '@modules/worksheet/services/worksheet-facade.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-worksheet-home',
  standalone: false,
  templateUrl: './worksheet-home.component.html',
  styleUrl: './worksheet-home.component.scss',
})
export class WorksheetHomeComponent {
  private unSubscribe = new Subject<void>();
  activeWorksheets: ActiveWorksheet[] = [];

  constructor(private worksheetFacadeService: WorksheetFacadeService) {}

  ngOnInit() {
    this.loadAllData();

    // subscriptions
    this.worksheetFacadeService.activeWorksheets$
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((data) => {
        this.activeWorksheets = data;
      });
  }

  loadAllData() {
    this.worksheetFacadeService.getActiveWorksheets(0, 0, 0);
  }

  onStatusChange(event: any) {
    console.log('Selected status:', event);
    this.worksheetFacadeService.getActiveWorksheets(0, 0, event);
  }

  onUserChange(event: any) {
    console.log('Selected user:', event);
    this.worksheetFacadeService.getActiveWorksheets(event, 0, 0);
  }

  onTankTypeChange(event: string) {
    this.loadAllData();
    if (event !== 'All') {
      this.activeWorksheets =
        this.activeWorksheets?.filter((x) => x.worksheet?.tankType?.value === event) == null
          ? []
          : this.activeWorksheets?.filter((x) => x.worksheet?.tankType?.value === event);
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
