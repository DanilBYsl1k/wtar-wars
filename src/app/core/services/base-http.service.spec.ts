import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BaseHttpService } from './base-http.service';
import { environment } from '@environment/environment';

describe('BaseHttpService', () => {
  let service: BaseHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseHttpService]
    });

    service = TestBed.inject(BaseHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a GET request', () => {
    const mockResponse = { data: 'test' };

    service.get<any>('testEndpoint').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.domain}/testEndpoint`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should perform a POST request', () => {
    const mockResponse = { data: 'test' };
    const mockRequest = { param: 'value' };

    service.post<any>('testEndpoint', mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.domain}/testEndpoint`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });

  it('should perform a DELETE request', () => {
    const mockResponse = { data: 'test' };
    const mockRequest = { param: 'value' };

    service.delete<any>('testEndpoint', mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne({
      url: `${environment.domain}/testEndpoint`,
      method: 'DELETE'
    });
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });

  it('should perform a PUT request', () => {
    const mockResponse = { data: 'test' };
    const mockRequest = { param: 'value' };

    service.put<any>('testEndpoint', mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.domain}/testEndpoint`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });

  it('should perform a PATCH request', () => {
    const mockResponse = { data: 'test' };
    const mockRequest = { param: 'value' };

    service.patch<any>('testEndpoint', mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.domain}/testEndpoint`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });
});
