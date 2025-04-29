import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetFilterComponent } from './worksheet-filter.component';

describe('WorksheetFilterComponent', () => {
  let component: WorksheetFilterComponent;
  let fixture: ComponentFixture<WorksheetFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorksheetFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorksheetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
