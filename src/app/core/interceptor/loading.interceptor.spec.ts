import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from "@core/services/loading.service";

describe('loadingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => TestBed.runInInjectionContext(() => loadingInterceptor(req, next));

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useValue: loadingInterceptor, multi: true },
        { provide: LoadingService, useValue: spy }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call show and hide on LoadingService', () => {
    const mockResponse = { data: 'test' };

    httpClient.get('/test').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://example.com/test');
    expect(loadingService.show).toHaveBeenCalled();

    req.flush(mockResponse);
    expect(loadingService.hide).toHaveBeenCalled();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
