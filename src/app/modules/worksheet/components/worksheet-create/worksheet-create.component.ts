import { Component, OnDestroy, OnInit } from '@angular/core';
import { FORM_CONTROL_NAMES, formConfig, formDetails } from './worksheet.config';
import { WorksheetFacadeService } from '@app/worksheet/services/worksheet-facade.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { DEFAULT_TANK_TYPE } from '@app/shared/constants/shared.contants';
import { CreateWorksheetRequest } from '@app/worksheet/models/create-worksheet';

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

  constructor(
    private router: Router,
    private worksheetFacadeService: WorksheetFacadeService,
  ) {}

  ngOnInit() {
    // subscriptions
    this.worksheetFacadeService.tankSelection$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(({ tanks, tankType }) => {
        this.formConfigData = this.formConfigData.map((data) => {
          if (data.name === FORM_CONTROL_NAMES.TANK_TYPE)
            return { ...data, value: tankType || DEFAULT_TANK_TYPE };
          else if (data.name === FORM_CONTROL_NAMES.TANKS) return { ...data, value: tanks };

          return data;
        });
      });
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
