import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { heroDetailsResolver } from './hero-details.resolver';

describe('heroDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => heroDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
