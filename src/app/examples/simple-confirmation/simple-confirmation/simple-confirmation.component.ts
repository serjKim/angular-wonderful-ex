import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { exhaustAll, Observable, startWith, Subject } from 'rxjs';
import { Pending, pending } from '../../../core';

@Component({
  selector: 'wex-simple-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <mat-dialog-content class="mat-typography">Proceed?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">No</button>
      <button mat-button [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SimpleConfirmationDialog {}

@Component({
  selector: 'wex-simple-confirmation',
  templateUrl: './simple-confirmation.component.html',
  styleUrls: ['./simple-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleConfirmationComponent {
  public readonly confirmResult$: Observable<boolean | Pending>;
  private readonly confirmDialog$ = new Subject<Observable<boolean | Pending>>();

  constructor(public readonly dialog: MatDialog) {
    this.confirmResult$ = this.confirmDialog$.pipe(exhaustAll());
  }

  public confirm(): void {
    this.confirmDialog$.next(this.openConfirmDialog().pipe(startWith(pending())));
  }

  private openConfirmDialog(): Observable<boolean> {
    return new Observable((subscribe) => {
      const instanceDialog = this.dialog.open(SimpleConfirmationDialog, { hasBackdrop: false });
      const subscription = instanceDialog.afterClosed().subscribe(subscribe);
      return () => {
        subscription.unsubscribe();
        instanceDialog.close(false);
      };
    });
  }
}
