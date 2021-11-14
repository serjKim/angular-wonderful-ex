import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { coreError, CoreResult, pending } from './core';

export type Roulette = CoreResult<number>;

@Injectable({ providedIn: 'root' })
export class RouletteStorage {
  public load(): Observable<Roulette> {
    return interval(1000).pipe(
      map((x) => {
        if (x % 2 === 0) {
          return x;
        }
        if (x % 3 === 0) {
          return coreError(new Error('Boom roulette!'));
        }
        return pending();
      }),
    );
  }
}
