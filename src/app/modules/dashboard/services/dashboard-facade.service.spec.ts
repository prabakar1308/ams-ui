import { TestBed } from '@angular/core/testing';

import { DashboardFacadeService } from './dashboard-facade.service';

describe('DashboardFacadeService', () => {
  let service: DashboardFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
