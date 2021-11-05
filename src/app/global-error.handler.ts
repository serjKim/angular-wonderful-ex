import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  public handleError(error: unknown): void {
    console.error('Global error handler: ', error);
  }
}
