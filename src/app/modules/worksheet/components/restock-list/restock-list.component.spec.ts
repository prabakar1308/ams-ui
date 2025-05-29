import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestockListComponent } from './restock-list.component';

describe('RestockListComponent', () => {
  let component: RestockListComponent;
  let fixture: ComponentFixture<RestockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestockListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
