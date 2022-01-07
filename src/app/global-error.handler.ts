import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

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

  public handleError(error: unknown): void {
    const err = this.extractError(error);
    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 401:
        case 403:
          this.openSnackBar('Unauthorized. Refresh the page and try again or contact to administrators.');
          break;
        case 404:
        case 400:
          this.openSnackBar('Resource not found. Refresh the page and try again or contact to administrators.');
          break;
      }
    } else {
      this.openSnackBar('An error occurred. Refresh the page and try again or contact to administrators.');
    }
    super.handleError(error);
  }

  private extractError(error: unknown): unknown {
    return this.isPromiseError(error) ? error.rejection : error;
  }

  private isPromiseError(err: unknown): err is PromiseError {
    return (err as PromiseError)?.rejection != null;
  }

  private openSnackBar(message: string): void {
    this.ngZone.run(() => {
      this.snackBar
        .open(message, 'Refresh')
        .onAction()
        .pipe(take(1))
        .subscribe(() => this.location.reload());
    });
  }
}
