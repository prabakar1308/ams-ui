import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveArtemiaReportComponent } from './live-artemia-report.component';

describe('LiveArtemiaReportComponent', () => {
  let component: LiveArtemiaReportComponent;
  let fixture: ComponentFixture<LiveArtemiaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveArtemiaReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveArtemiaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
