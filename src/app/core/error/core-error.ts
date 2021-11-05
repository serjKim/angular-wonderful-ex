import { HttpErrorResponse } from '@angular/common/http';
import { error, ResultError } from './result-error';

export const enum CoreErrorType {
  HttpCall = 'HttpCall',
  Unexpected = 'Unexpected',
}

export class HttpCallError {
  public readonly type = CoreErrorType.HttpCall;
  constructor(public readonly err: HttpErrorResponse | Error) {}
}

export class UnexpectedError {
  public readonly type = CoreErrorType.Unexpected;
  constructor(public readonly err: Error) {}
}

// prettier-ignore
export type CoreError =
  | HttpCallError
  | UnexpectedError
  ;

export const CoreError = {
  unexpected(err: Error): ResultError<UnexpectedError> {
    return error(new UnexpectedError(err));
  },
  httpCall(err: HttpErrorResponse | Error): ResultError<HttpCallError> {
    return error(new HttpCallError(err));
  },
};
