import { TestBed } from '@angular/core/testing';

import { BookManagerService } from './book-manager.server';

describe('BookManagerServer', () => {
  let service: BookManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
