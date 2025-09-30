import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTrackerComponent } from './source-tracker.component';

describe('SourceTrackerComponent', () => {
  let component: SourceTrackerComponent;
  let fixture: ComponentFixture<SourceTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
