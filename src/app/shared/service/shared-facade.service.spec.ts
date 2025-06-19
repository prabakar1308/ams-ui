import { TestBed } from '@angular/core/testing';

import { SharedFacadeService } from './shared-facade.service';

describe('SharedFacadeService', () => {
  let service: SharedFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
