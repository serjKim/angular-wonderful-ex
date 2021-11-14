import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { catchCoreError, CoreHttpClient, CoreResult, pending } from '../core';

export interface SideEffect {
  readonly entityId: number;
  readonly comment: string;
}

@Injectable({
  providedIn: 'root',
})
export class EntitiesHttp {
  constructor(private readonly http: CoreHttpClient) {}

  public post(comment: string): Observable<CoreResult<SideEffect>> {
    // return this.wexHttpClient.request((c) =>
    //   c.post('https://myend.free.beeceptor.com/', {}).pipe(
    //     map(() => ({ entityId: new Date().valueOf() }))
    //   ));
    return of(new Date().valueOf()).pipe(
      delay(400),
      map((entityId) => ({ entityId, comment })),
      startWith(pending()),
      catchCoreError(),
    );
  }
}
