import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestHomeComponent } from './harvest-home.component';

describe('HarvestHomeComponent', () => {
  let component: HarvestHomeComponent;
  let fixture: ComponentFixture<HarvestHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HarvestHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
