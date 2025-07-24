import { TestBed } from '@angular/core/testing';

import { BookManagerServer } from './book-manager.server';

describe('BookManagerServer', () => {
  let service: BookManagerServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookManagerServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
