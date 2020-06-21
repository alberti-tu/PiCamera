import { TestBed } from '@angular/core/testing';

import { HttpServiceInterceptor } from './http-service.interceptor';

describe('HttpServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpServiceInterceptor = TestBed.inject(HttpServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
