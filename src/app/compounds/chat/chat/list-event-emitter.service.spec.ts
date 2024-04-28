import { TestBed } from '@angular/core/testing';

import { ListEventEmitterService } from './list-event-emitter.service';

describe('ListEventEmitterService', () => {
  let service: ListEventEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListEventEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
