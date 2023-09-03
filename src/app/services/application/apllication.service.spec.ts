import { TestBed } from '@angular/core/testing';

import { ApllicationService } from './apllication.service';

describe('ApllicationService', () => {
  let service: ApllicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApllicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
