import { TestBed } from '@angular/core/testing';

import { ButTelechargementService } from './butTelechargement.service';

describe('UtilitelogicielService', () => {
  let service: ButTelechargementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButTelechargementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
