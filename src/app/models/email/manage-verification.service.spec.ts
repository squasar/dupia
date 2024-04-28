import { TestBed } from '@angular/core/testing';

import { ManageVerificationService } from './manage-verification.service';

describe('ManageVerificationService', () => {
  let service: ManageVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
