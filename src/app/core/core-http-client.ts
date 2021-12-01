import { defer, Observable, OperatorFunction, pipe } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { catchCoreError } from './error';
import { CoreResult, pending } from './result';

/**
 * Wraps T with CoreResult
 */
export function wrap<T>(): OperatorFunction<T, CoreResult<T>> {
  return pipe(catchCoreError(), startWith(pending()));
}

/**
 * Promise (Non-cancelable) version of wrap
 *
 * @see {@link wrap}
 */
export function wrapAsync<TResult>(builder: () => Promise<TResult>): Observable<CoreResult<TResult>> {
  return defer(() => builder()).pipe(catchCoreError(), startWith(pending()));
}
