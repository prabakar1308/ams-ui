import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestConversionLogsComponent } from './harvest-conversion-logs.component';

describe('HarvestConversionLogsComponent', () => {
  let component: HarvestConversionLogsComponent;
  let fixture: ComponentFixture<HarvestConversionLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HarvestConversionLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestConversionLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
