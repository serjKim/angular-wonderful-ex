import { OverlayModule } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NativeDateAdapterEx } from './date-adapter';

@NgModule({
  exports: [
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    PortalModule,
    OverlayModule,
    MatSelectModule,
    MatExpansionModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: NativeDateAdapterEx,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ],
})
export class MaterialModule {}
