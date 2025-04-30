import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetCreateComponent } from './worksheet-create.component';

describe('WorksheetCreateComponent', () => {
  let component: WorksheetCreateComponent;
  let fixture: ComponentFixture<WorksheetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorksheetCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksheetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
