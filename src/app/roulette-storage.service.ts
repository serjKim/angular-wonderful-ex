import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreError, Pending, pending, ResultError, UnexpectedError } from './core';

export type Roulette = number | ResultError<UnexpectedError> | Pending;

@Injectable({ providedIn: 'root' })
export class RouletteStorage {
  public load(): Observable<Roulette> {
    return interval(1000).pipe(
      map((x) => {
        if (x % 2 === 0) {
          return x;
        }
        if (x % 3 === 0) {
          return CoreError.unexpected(new Error('Boom roulette!'));
        }
        return pending();
      }),
    );
  }
}
