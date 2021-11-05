import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { catchCoreError, CoreResultError } from './error';
import { pending, Pending } from './pending';

export type WexHttpResult<T> = Observable<T | CoreResultError | Pending>;

@Injectable({ providedIn: 'root' })
export class WexHttpClient {
  constructor(private readonly http: HttpClient) {}
  public request<TResult>(builder: (httpClient: HttpClient) => Observable<TResult>): WexHttpResult<TResult> {
    return builder(this.http).pipe(catchCoreError(), startWith(pending()));
  }
}
