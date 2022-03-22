import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CoreError, CoreErrorEmitter } from '../core';
import { ErrorsToastComponent, ErrorsToastData } from '../shared';

interface ClientHttpError {
  errorMessage: string;
  errorCode: string | null;
}

function isClientHttpError(x: unknown): x is ClientHttpError {
  const raw = x as ClientHttpError;
  return !!raw?.errorMessage;
}

interface ClientHttpErrors {
  errors: { [propName: string]: ClientHttpError[] | null } | null;
}

class CoreErrorHandler {
  private readonly subscription = new Subscription();

  constructor(private readonly snackBar: MatSnackBar, private readonly errorEmitter: CoreErrorEmitter) {
    this.init();
  }

  public destroy(): void {
    this.subscription.unsubscribe();
  }

  private init(): void {
    this.subscription.add(this.errorEmitter.emitter.subscribe(this.handleCoreError));
  }

  private handleCoreError = (err: CoreError): void => {
    if (err instanceof HttpErrorResponse && this.tryHandleHttpErrors(err)) {
      return;
    }

    if (err instanceof Error) {
      this.openToast([`An error occurred: ${err.message}`]);
      return;
    }

    this.openToast(['An error occurred, please try again or contact your system administrator.']);
  };

  private tryHandleHttpErrors(err: HttpErrorResponse): boolean {
    const clientError = err.error as ClientHttpErrors | null;
    if (!clientError?.errors) {
      return false;
    }

    const propNames = Object.keys(clientError.errors);
    const allErrors: string[] = [];

    for (const propName of propNames) {
      const errors = clientError.errors[propName];
      if (!Array.isArray(errors)) {
        continue;
      }
      for (const error of errors) {
        if (!isClientHttpError(error)) {
          continue;
        }
        allErrors.push(error.errorMessage);
      }
    }

    if (!allErrors.length) {
      return false;
    }

    this.openToast(allErrors);

    return true;
  }

  private openToast(errors: string[]): void {
    const data: ErrorsToastData = {
      errors,
    };
    this.snackBar.openFromComponent(ErrorsToastComponent, { data, panelClass: 'wex-error-toast' });
  }
}

@Injectable()
export class CoreErrorHandlerHost implements OnDestroy {
  private instance: CoreErrorHandler | null = null;

  constructor(private readonly snackBar: MatSnackBar, private readonly errorEmitter: CoreErrorEmitter) {}

  public register(): void {
    if (this.instance == null) {
      this.instance = new CoreErrorHandler(this.snackBar, this.errorEmitter);
    }
  }

  public ngOnDestroy(): void {
    if (this.instance != null) {
      this.instance.destroy();
    }
  }
}
