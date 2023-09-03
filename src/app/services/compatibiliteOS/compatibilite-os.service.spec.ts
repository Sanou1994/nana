import { TestBed } from '@angular/core/testing';

import { CompatibiliteOSService } from './compatibilite-os.service';

describe('CompatibiliteOSService', () => {
  let service: CompatibiliteOSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompatibiliteOSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
