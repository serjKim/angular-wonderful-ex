import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreErrorHandlerHost } from './core-error-handler.service';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [],
  providers: [CoreErrorHandlerHost],
})
export class CoreErrorHandlerModule {
  constructor(errorToastHost: CoreErrorHandlerHost) {
    errorToastHost.register();
  }
}
