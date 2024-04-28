import { TestBed } from '@angular/core/testing';

import { ManipulateLangService } from './manipulate-lang.service';

describe('ManipulateLangService', () => {
  let service: ManipulateLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManipulateLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
