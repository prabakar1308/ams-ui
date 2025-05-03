import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestCreateComponent } from './harvest-create.component';

describe('HarvestCreateComponent', () => {
  let component: HarvestCreateComponent;
  let fixture: ComponentFixture<HarvestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HarvestCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
