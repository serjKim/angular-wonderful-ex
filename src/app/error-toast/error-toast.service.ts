import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CoreError, CoreErrorEmitter } from '../core';

class ErrorToastService {
  private readonly subscription = new Subscription();

  constructor(private readonly snackBar: MatSnackBar, private readonly errorEmitter: CoreErrorEmitter) {
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

  private handleCoreError(err: CoreError): void {
    if (err instanceof HttpErrorResponse) {
      this.snackBar.open(`${err.status}: ${err.message}`, 'Close');
    } else if (err instanceof Error) {
      this.snackBar.open(`An error occurred: ${err.message}`, 'Close');
    } else {
      this.snackBar.open('An unexpected error occurred', 'Close');
    }
  }
}

@Injectable()
export class ErrorToastHost implements OnDestroy {
  private instance: ErrorToastService | null = null;

  constructor(private readonly snackBar: MatSnackBar, private readonly errorEmitter: CoreErrorEmitter) {}

  public register(): void {
    if (this.instance == null) {
      this.instance = new ErrorToastService(this.snackBar, this.errorEmitter);
    }
  }

  public ngOnDestroy(): void {
    if (this.instance != null) {
      this.instance.destroy();
    }
  }
}
