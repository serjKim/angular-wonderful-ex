import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CoreError, CoreErrorType, UnwrapService } from '../core';

type WriteError = (message: string, ...params: unknown[]) => void;

const WRITE_ERROR = new InjectionToken<WriteError>('Console.error caller', {
  providedIn: 'root',
  factory: () => console.error,
});

@Injectable({
  providedIn: 'root',
})
export class ErrorToastService implements OnDestroy {
  private readonly subscription = new Subscription();

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly unwrapService: UnwrapService,
    @Inject(WRITE_ERROR) private readonly writeError: WriteError,
  ) {}

  public init(): void {
    this.subscription.add(this.unwrapService.raiseError.subscribe(this.handleCoreError));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private handleCoreError = (coreError: CoreError) => {
    switch (coreError.type) {
      case CoreErrorType.Unexpected:
        this.writeError('Handled: ', coreError.err);
        this.snackBar.open(coreError.err.message, 'Close');
        break;
      case CoreErrorType.HttpCall:
        this.handleHttpCallError(coreError.err);
        break;
      default:
        const unexpected: never = coreError;
        console.error(unexpected);
    }
  };

  private handleHttpCallError(err: HttpErrorResponse | Error) {
    if (err instanceof HttpErrorResponse) {
      this.writeError('Http response: ', err);
      this.snackBar.open(`${err.status}: ${err.message}`, 'Close');
    } else {
      this.writeError('Http (unknown error): ', err);
      this.snackBar.open(`An error ocurred during http: ${err.message}`, 'Close');
    }
  }
}
