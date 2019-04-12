import { TestBed, inject } from '@angular/core/testing';

import { ResponseHandlerInterceptorService } from './response-handler-interceptor.service';

describe('ResponseHandlerInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseHandlerInterceptorService]
    });
  });

  it('should be created', inject([ResponseHandlerInterceptorService], (service: ResponseHandlerInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
