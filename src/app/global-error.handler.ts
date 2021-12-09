import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

interface PromiseError {
  readonly rejection: unknown;
}

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  public handleError(error: unknown): void {
    const err = this.extractError(error);
    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 401:
        case 403:
          // redirect
          break;
        case 404:
        case 400:
          // display toast
          break;
      }
    } else {
      // other errors
    }
    super.handleError(error);
  }

  private extractError(error: unknown): unknown {
    return this.isPromiseError(error) ? error.rejection : error;
  }

  private isPromiseError(err: unknown): err is PromiseError {
    return (err as PromiseError)?.rejection != null;
  }
}
