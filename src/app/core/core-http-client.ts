import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { catchCoreError } from './error';
import { CoreResult } from './result';
import { pending } from './result/pending';

@Injectable({ providedIn: 'root' })
export class CoreHttpClient {
  constructor(private readonly http: HttpClient) {}
  public request<TResult>(builder: (httpClient: HttpClient) => Observable<TResult>): Observable<CoreResult<TResult>> {
    return builder(this.http).pipe(catchCoreError(), startWith(pending()));
  }
}
