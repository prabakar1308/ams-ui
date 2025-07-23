import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetUnitDetailsComponent } from './worksheet-unit-details.component';

describe('WorksheetUnitDetailsComponent', () => {
  let component: WorksheetUnitDetailsComponent;
  let fixture: ComponentFixture<WorksheetUnitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorksheetUnitDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksheetUnitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
