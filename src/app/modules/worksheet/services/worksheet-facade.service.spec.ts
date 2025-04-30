import { TestBed } from '@angular/core/testing';

import { WorksheetFacadeService } from './worksheet-facade.service';

describe('WorksheetFacadeService', () => {
  let service: WorksheetFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksheetFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
