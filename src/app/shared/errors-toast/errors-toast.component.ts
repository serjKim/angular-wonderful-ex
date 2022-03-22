import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface ErrorsToastData {
  readonly errors: string[];
  readonly actionTitle?: string;
}

@Component({
  selector: 'wex-errors-toast',
  templateUrl: './errors-toast.component.html',
  styleUrls: ['./errors-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public readonly data: ErrorsToastData,
    private readonly snackBar: MatSnackBarRef<string[]>,
  ) {}

  public close(): void {
    this.snackBar.dismissWithAction();
  }
}
