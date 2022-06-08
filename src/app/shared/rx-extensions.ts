import { Injectable, OnDestroy } from '@angular/core';
import { AsyncSubject, MonoTypeOperatorFunction, ReplaySubject, share, shareReplay } from 'rxjs';

export function shareLast<T>(): MonoTypeOperatorFunction<T> {
  return share({
    connector: () => new AsyncSubject<T>(),
    resetOnComplete: false,
    resetOnError: false,
    resetOnRefCountZero: false,
  });
}

export function shareOne<T>(): MonoTypeOperatorFunction<T> {
  return shareReplay<T>({ bufferSize: 1, refCount: true });
}

@Injectable()
export class NgDestroyable extends ReplaySubject<void> implements OnDestroy {
  constructor() {
    super(1);
  }
  public ngOnDestroy(): void {
    super.next();
    super.complete();
  }
}
