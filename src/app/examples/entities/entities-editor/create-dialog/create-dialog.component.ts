import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'wex-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly checkReason: string) {}
}
