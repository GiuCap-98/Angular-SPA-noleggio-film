import { TestBed } from '@angular/core/testing';

import { ServiceRentService } from './service-rent.service';

describe('ServiceRentService', () => {
  let service: ServiceRentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
