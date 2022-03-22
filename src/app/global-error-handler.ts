import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ErrorsToastComponent, ErrorsToastData } from './shared';

const LOCATION = new InjectionToken<Location>('window.location accessor', {
  providedIn: 'root',
  factory: () => window.location,
});

interface PromiseError {
  readonly rejection: unknown;
}

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(
    private readonly snackBar: MatSnackBar,
    @Inject(LOCATION) private location: Location,
    private readonly ngZone: NgZone,
  ) {
    super();
  }

  public override handleError(error: unknown): void {
    const err = this.extractError(error);

    if (!this.tryHandleHttpError(err)) {
      this.openSnackBar(
        'An error occurred, please refresh the page and try again or contact your system administrator.',
      );
    }

    super.handleError(error);
  }

  private tryHandleHttpError(err: unknown): boolean {
    if (!(err instanceof HttpErrorResponse)) {
      return false;
    }

    switch (err.status) {
      case 401:
      case 403:
        // TODO: redirect to the error component
        return true;
      case 404:
        this.openSnackBar('One of resources you requested is not found, please contact your system administrator.');
        return true;
      case 400:
        this.openSnackBar('Bad request. Refresh the page and try again or contact to administrators.');
        return true;
    }

    return false;
  }

  private extractError(error: unknown): unknown {
    return this.isPromiseError(error) ? error.rejection : error;
  }

  private isPromiseError(err: unknown): err is PromiseError {
    return (err as PromiseError)?.rejection != null;
  }

  private openSnackBar(message: string): void {
    const data: ErrorsToastData = {
      errors: [message],
      actionTitle: 'Refresh',
    };
    this.ngZone.run(() => {
      this.snackBar
        .openFromComponent(ErrorsToastComponent, { data, panelClass: 'wex-error-toast' })
        .onAction()
        .pipe(take(1))
        .subscribe(() => this.location.reload());
    });
  }
}
