import { TestBed } from '@angular/core/testing';

import { DefensorService } from './defensor.service';

describe('DefensorService', () => {
  let service: DefensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
