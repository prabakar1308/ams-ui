import { TestBed } from '@angular/core/testing';

import { ReportFacadeService } from './report-facade.service';

describe('ReportFacadeService', () => {
  let service: ReportFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
