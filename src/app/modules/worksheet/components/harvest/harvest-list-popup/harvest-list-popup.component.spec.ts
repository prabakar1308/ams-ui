import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestListPopupComponent } from './harvest-list-popup.component';

describe('HarvestListPopupComponent', () => {
  let component: HarvestListPopupComponent;
  let fixture: ComponentFixture<HarvestListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HarvestListPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HarvestListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
