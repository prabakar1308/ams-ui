import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestListComponent } from './harvest-list.component';

describe('HarvestListComponent', () => {
  let component: HarvestListComponent;
  let fixture: ComponentFixture<HarvestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HarvestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
