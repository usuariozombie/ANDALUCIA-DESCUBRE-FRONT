import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { townGuard } from './town.guard';

describe('townGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => townGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
