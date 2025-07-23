import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTanksComponent } from './dashboard-tanks.component';

describe('DashboardTanksComponent', () => {
  let component: DashboardTanksComponent;
  let fixture: ComponentFixture<DashboardTanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTanksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
