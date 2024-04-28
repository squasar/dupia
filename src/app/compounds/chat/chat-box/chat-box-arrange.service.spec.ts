import { TestBed } from '@angular/core/testing';

import { ChatBoxArrangeService } from './chat-box-arrange.service';

describe('ChatBoxArrangeService', () => {
  let service: ChatBoxArrangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatBoxArrangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
