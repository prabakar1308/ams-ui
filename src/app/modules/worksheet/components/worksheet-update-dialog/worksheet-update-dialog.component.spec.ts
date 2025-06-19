import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetUpdateDialogComponent } from './worksheet-update-dialog.component';

describe('WorksheetUpdateDialogComponent', () => {
  let component: WorksheetUpdateDialogComponent;
  let fixture: ComponentFixture<WorksheetUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorksheetUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksheetUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
