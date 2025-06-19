import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInputReportComponent } from './stock-input-report.component';

describe('StockInputReportComponent', () => {
  let component: StockInputReportComponent;
  let fixture: ComponentFixture<StockInputReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockInputReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockInputReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
