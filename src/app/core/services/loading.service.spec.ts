import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]

    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show is called', (done) => {
    service.show();
    service.loading$.subscribe((loading) => {
      expect(loading).toBeTrue();
      done();
    });
  });

  it('should emit false after 1 second when hide is called', fakeAsync(() => {
    service.show();
    service.hide();

    tick(500);

    service.loading$.subscribe((loading) => {
      expect(loading).toBeFalse();
    });
  }));

  it('should stop emitting false if show is called during hide', fakeAsync(() => {
    service.show();
    service.hide();

    tick(500);
    service.show();
    tick(500);

    service.loading$.subscribe((loading) => {
      expect(loading).toBeTrue();
    });
  }));

});
