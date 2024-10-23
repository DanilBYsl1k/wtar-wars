import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "@environment/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  private domainAPI = environment.domain;

  constructor(private httpClient: HttpClient) {}

  get<T>(methods: string, params: object = {}, header ={} ): Observable<T> {
    return this.httpClient.get<T>(`${this.domainAPI}${methods}`, {
      headers: header as HttpHeaders,
      params: params as HttpParams,
    });
  }

  post<T>(methods: string, params: object = {}): Observable<T> {
    return this.httpClient.post<T>(`${this.domainAPI}/${methods}`, params);
  }

  delete<T>(methods: string, params: object = {}): Observable<T> {
    return this.httpClient.delete<T>(`${this.domainAPI}/${methods}`, {
      body: params,
    });
  }

  put<T>(methods: string, params: object = {}): Observable<T> {
    return this.httpClient.put<T>(`${this.domainAPI}/${methods}`, params);
  }

  patch<T>(methods: string, params: object = {}): Observable<T> {
    return this.httpClient.patch<T>(`${this.domainAPI}/${methods}`, params);
  }
}
