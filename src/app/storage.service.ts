import { Injectable } from '@angular/core';
import { defer, Observable, of, Subject } from 'rxjs';
import { delay, map, startWith, switchMap } from 'rxjs/operators';
import { catchCoreError, CoreError, Pending, pending, ResultError } from './core';

// prettier-ignore
export type Items =
  | string
  | ResultError<CoreError>
  | Pending
  ;

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly refresher$ = new Subject<void>();
  private counter = 0;

  constructor() {}

  public getItems(): Observable<Items> {
    return this.refresher$.pipe(switchMap(() => this.loadItems()));
  }

  public load(): void {
    this.refresher$.next();
  }

  private loadItems(): Observable<Items> {
    return defer(() => {
      const current = this.counter++;
      console.log('Loading: ', current);
      return of(current);
    }).pipe(
      map((x) => {
        if (x % 2 === 0) {
          throw new Error(`Booom! ${new Date().valueOf()}`);
        }
        return x.toString();
      }),
      catchCoreError(),
      delay(900),
      startWith(pending()),
    );
  }
}
