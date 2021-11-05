import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { pending, Pending } from './pending';
import { catchHttpError, CoreError, ResultError } from './error';

export type WexHttpResult<T> = Observable<T | ResultError<CoreError> | Pending>;

@Injectable({ providedIn: 'root' })
export class WexHttpClient {
  constructor(private readonly http: HttpClient) {}
  public request<TResult>(builder: (httpClient: HttpClient) => Observable<TResult>): WexHttpResult<TResult> {
    return builder(this.http).pipe(catchHttpError(), startWith(pending()));
  }
}
