import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankListComponent } from './tank-list.component';

describe('TankListComponent', () => {
  let component: TankListComponent;
  let fixture: ComponentFixture<TankListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TankListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
