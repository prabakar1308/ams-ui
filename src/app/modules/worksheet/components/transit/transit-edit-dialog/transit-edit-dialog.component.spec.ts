import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitEditDialogComponent } from './transit-edit-dialog.component';

describe('TransitEditDialogComponent', () => {
  let component: TransitEditDialogComponent;
  let fixture: ComponentFixture<TransitEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransitEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
