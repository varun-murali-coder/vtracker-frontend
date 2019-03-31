import { TestBed } from '@angular/core/testing';

import { DashboardTrackService } from './dashboard-track.service';

describe('DashboardTrackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardTrackService = TestBed.get(DashboardTrackService);
    expect(service).toBeTruthy();
  });
});
