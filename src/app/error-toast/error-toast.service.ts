import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CoreError, CoreErrorEmitter } from '../core';

type ErrorOutput = (message: string, ...params: unknown[]) => void;

const ERROR_OUTPUT = new InjectionToken<ErrorOutput>('Console.error caller', {
  providedIn: 'root',
  factory: () => console.error,
});

class ErrorToastService {
  private readonly subscription = new Subscription();

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly errorEmitter: CoreErrorEmitter,
    private readonly errorOutput: ErrorOutput,
  ) {
    this.init();
  }

  public destroy(): void {
    this.subscription.unsubscribe();
  }

  private init(): void {
    this.subscription.add(
      this.errorEmitter.emitter.subscribe((x) => {
        this.handleCoreError(x);
      }),
    );
  }

  private handleCoreError(err: CoreError) {
    if (err instanceof HttpErrorResponse) {
      this.snackBar.open(`${err.status}: ${err.message}`, 'Close');
    } else {
      this.snackBar.open(`An error ocurred: ${err?.message ?? err}`, 'Close');
    }
    this.errorOutput('Handled: ', err);
  }
}

@Injectable()
export class ErrorToastHost implements OnDestroy {
  private instance: ErrorToastService | null = null;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly errorEmitter: CoreErrorEmitter,
    @Inject(ERROR_OUTPUT) private readonly errorOutput: ErrorOutput,
  ) {}

  public register(): void {
    if (this.instance == null) {
      this.instance = new ErrorToastService(this.snackBar, this.errorEmitter, this.errorOutput);
    }
  }

  public ngOnDestroy(): void {
    if (this.instance != null) {
      this.instance.destroy();
    }
  }
}
