import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { DEFAULT_TANK_TYPE } from '@app/shared/constants/shared.contants';
import { CreateWorksheetRequest } from '@app/worksheet/models/create-worksheet';
import { WorksheetFilter } from '@app/shared/models/shared-state';
import { FORM_CONTROL_NAMES, formConfig, formDetails } from './worksheet.config';

@Component({
  selector: 'app-worksheet-create',
  standalone: false,
  templateUrl: './worksheet-create.component.html',
  styleUrl: './worksheet-create.component.scss',
})
export class WorksheetCreateComponent implements OnInit, OnDestroy {
  private unSubscribe = new Subject<void>();
  formConfigData = formConfig;
  formDetails = formDetails;
  worksheetFilter: WorksheetFilter = {};
  selectedTankType: number = DEFAULT_TANK_TYPE;

  constructor(
    private router: Router,
    private worksheetFacadeService: WorksheetFacadeService,
  ) {}

  ngOnInit() {
    // Combine activeWorksheets$ and tankSelection$
    combineLatest([
      this.worksheetFacadeService.activeWorksheets$,
      this.worksheetFacadeService.tankSelection$,
    ])
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(([activeWorksheets, tankSelection]) => {
        const { tanks, tankType } = tankSelection;

        if (!tankType) {
          this.selectedTankType = tankType || DEFAULT_TANK_TYPE;
          this.worksheetFacadeService.getActiveWorksheets({
            tankTypeId: DEFAULT_TANK_TYPE,
            userId: 0,
            statusId: 0,
          });
        }

        // Update formConfigData based on tankSelection and activeWorksheets
        this.formConfigData = this.formConfigData.map((data) => {
          if (data.name === FORM_CONTROL_NAMES.TANK_TYPE) {
            return { ...data, value: tankType || DEFAULT_TANK_TYPE };
          } else if (data.name === FORM_CONTROL_NAMES.TANKS) {
            return {
              ...data,
              value: tanks,
              options: activeWorksheets
                .filter((ws) => !ws.worksheetId)
                .map((ws) => ({
                  label: `Tank ${ws.tankNumber}`,
                  value: ws.tankNumber,
                })),
            };
          }
          return data;
        });
      });
  }

  formValueChange(event: unknown) {
    const { name, value } = event as { name: string; value: number };
    if (name === FORM_CONTROL_NAMES.TANK_TYPE) {
      this.worksheetFacadeService.updateWorksheetTankSelection({ tankType: value, tanks: [] });
      this.worksheetFacadeService.getActiveWorksheets({
        tankTypeId: value,
        userId: 0,
        statusId: 0,
      });
    }
  }

  goToHomePage() {
    this.router.navigate(['/worksheet']);
  }

  submitFormData(formData: unknown) {
    const data = formData as CreateWorksheetRequest;
    console.log(data);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
