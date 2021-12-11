import { TestBed } from '@angular/core/testing';

import { AppRouter } from './app-router';

describe('AppRouterService', () => {
  let service: AppRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRouter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
