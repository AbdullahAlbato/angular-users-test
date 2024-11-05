/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ConfigService } from '../configuration/config.service';
@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(
    private readonly httpClient: HttpClient,
    public readonly configService: ConfigService
  ) {}
  prepareHttpParams<T>(queryParams: T): HttpParams {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((key) => {
      if (
        queryParams[key] !== undefined &&
        queryParams[key] != null &&
        queryParams[key] !== ''
      ) {
        params = params.set(key, queryParams[key]);
      }
    });
    return params;
  }
  getHttp<T>(url: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(url, { params });
  }
  postHttp<T>(url: string, body: any) {
    return this.httpClient.post<T>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }
  deleteHttp<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
    }
  ): Observable<T> {
    return this.httpClient.delete<T>(url, options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }
  putHttp<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error?.error?.message;
    // this.messageService.add({
    //   severity: 'error',
    //   summary: this.translatePipe.transform('auth.error'),
    //   detail: errorMessage,
    // });
  }
}
