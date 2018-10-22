import { TestBed } from '@angular/core/testing';

import { AuthGuardLoggedOutService } from './auth-guard-logged-out.service';

describe('AuthGuardLoggedOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardLoggedOutService = TestBed.get(AuthGuardLoggedOutService);
    expect(service).toBeTruthy();
  });
});
