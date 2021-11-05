import { HttpErrorResponse } from '@angular/common/http';
import { error, ResultError } from './result-error';

// prettier-ignore
export type CoreError =
  | HttpErrorResponse
  | Error
  /* Add another one type */
  ;

export type CoreResultError = ResultError<CoreError>;

export function coreError(err: CoreError): CoreResultError {
  return error(err);
}
