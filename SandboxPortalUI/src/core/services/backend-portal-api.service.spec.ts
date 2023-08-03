import { TestBed } from '@angular/core/testing';

import { BackendPortalApiService } from './backend-portal-api.service';

describe('backendPortalApiService', () => {
  let service: BackendPortalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendPortalApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
