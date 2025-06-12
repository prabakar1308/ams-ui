import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalArtemiaReportComponent } from './total-artemia-report.component';

describe('TotalArtemiaReportComponent', () => {
  let component: TotalArtemiaReportComponent;
  let fixture: ComponentFixture<TotalArtemiaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalArtemiaReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalArtemiaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
