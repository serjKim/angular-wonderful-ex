import { of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { coreError, CoreError, CoreResultError } from './core-error';

export function catchCoreError<T>(): OperatorFunction<T, T | CoreResultError> {
  return catchError((err: CoreError) => of(coreError(err)));
}
