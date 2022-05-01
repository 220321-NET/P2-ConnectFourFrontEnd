import { TestBed } from '@angular/core/testing';

import { RankingServiceService } from './ranking-service.service';

describe('RankingServiceService', () => {
  let service: RankingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
