import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CreateConfirmation {
  constructor(public readonly dialog: MatDialog) {}

  public openDialog(reason: string): Observable<boolean | null> {
    return new Observable((subscribe) => {
      const instanceDialog = this.dialog.open<CreateDialogComponent, string, boolean>(CreateDialogComponent, {
        hasBackdrop: false,
        data: reason,
      });
      const subscription = instanceDialog.afterClosed().subscribe(subscribe);
      return () => {
        subscription.unsubscribe();
        instanceDialog.close();
      };
    });
  }
}
