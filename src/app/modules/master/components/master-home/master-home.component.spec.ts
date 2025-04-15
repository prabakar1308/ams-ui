import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterHomeComponent } from './master-home.component';

describe('MasterHomeComponent', () => {
  let component: MasterHomeComponent;
  let fixture: ComponentFixture<MasterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
