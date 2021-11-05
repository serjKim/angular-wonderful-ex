import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorToastService } from './error-toast.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule, BrowserAnimationsModule],
  exports: [],
  providers: [ErrorToastService],
})
export class ErrorToastModule {
  constructor(private readonly errorToastService: ErrorToastService) {
    this.errorToastService.init();
  }
}
