import { TestBed } from '@angular/core/testing';

import { SharedSserviceService } from './shared-sservice.service';

describe('SharedSserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedSserviceService = TestBed.get(SharedSserviceService);
    expect(service).toBeTruthy();
  });
});
