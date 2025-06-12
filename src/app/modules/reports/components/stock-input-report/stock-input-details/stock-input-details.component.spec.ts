import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInputDetailsComponent } from './stock-input-details.component';

describe('StockInputDetailsComponent', () => {
  let component: StockInputDetailsComponent;
  let fixture: ComponentFixture<StockInputDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockInputDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockInputDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
