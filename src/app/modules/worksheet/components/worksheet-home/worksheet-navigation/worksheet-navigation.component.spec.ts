import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetNavigationComponent } from './worksheet-navigation.component';

describe('WorksheetNavigationComponent', () => {
  let component: WorksheetNavigationComponent;
  let fixture: ComponentFixture<WorksheetNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorksheetNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksheetNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
