import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorToastHost } from './error-toast.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule, BrowserAnimationsModule],
  exports: [],
  providers: [ErrorToastHost],
})
export class ErrorToastModule {
  constructor(errorToastHost: ErrorToastHost) {
    errorToastHost.register();
  }
}
