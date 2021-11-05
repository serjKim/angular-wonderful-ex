import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorToastRegistrator } from './error-toast.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule, BrowserAnimationsModule],
  exports: [],
  providers: [ErrorToastRegistrator],
})
export class ErrorToastModule {
  constructor(errorToastRegistrator: ErrorToastRegistrator) {
    errorToastRegistrator.register();
  }
}
