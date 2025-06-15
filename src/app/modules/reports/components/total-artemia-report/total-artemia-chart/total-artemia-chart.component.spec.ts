import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalArtemiaChartComponent } from './total-artemia-chart.component';

describe('TotalArtemiaChartComponent', () => {
  let component: TotalArtemiaChartComponent;
  let fixture: ComponentFixture<TotalArtemiaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalArtemiaChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalArtemiaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
