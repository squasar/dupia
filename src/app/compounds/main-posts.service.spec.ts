import { TestBed } from '@angular/core/testing';

import { MainPostsService } from './main-posts.service';

describe('MainPostsService', () => {
  let service: MainPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
