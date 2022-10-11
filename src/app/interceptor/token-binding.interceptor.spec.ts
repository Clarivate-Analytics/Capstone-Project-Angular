import { TestBed } from '@angular/core/testing';

import { TokenBindingInterceptor } from './token-binding.interceptor';

describe('TokenBindingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenBindingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenBindingInterceptor = TestBed.inject(TokenBindingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
