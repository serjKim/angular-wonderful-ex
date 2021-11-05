import { HttpErrorResponse } from '@angular/common/http';
import { of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoreError, HttpCallError } from './core-error';
import { ResultError } from './result-error';

export function catchHttpError<T>(): OperatorFunction<T, T | ResultError<HttpCallError>> {
  return catchError((err: HttpErrorResponse | Error) => of(CoreError.httpCall(err)));
}
