import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CoreError, UnwrapService } from '../core';

type ErrorOutput = (message: string, ...params: unknown[]) => void;

const ERROR_OUTPUT = new InjectionToken<ErrorOutput>('Console.error caller', {
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
    @Inject(ERROR_OUTPUT) private readonly errorOutput: ErrorOutput,
  ) {}

  public init(): void {
    this.subscription.add(this.unwrapService.raiseError.subscribe(this.handleCoreError));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private handleCoreError = (err: CoreError) => {
    if (err instanceof HttpErrorResponse) {
      this.errorOutput('Http response: ', err);
      this.snackBar.open(`${err.status}: ${err.message}`, 'Close');
    } else {
      this.errorOutput('Unexpected: ', err);
      this.snackBar.open(`An error ocurred: ${err.message}`, 'Close');
    }
  };
}
