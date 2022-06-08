import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { CoreErrorHandlerModule } from './core-error-handler';
import { EntitiesMockInterceptor } from './examples/crud-entities';
import { GlobalErrorHandler } from './global-error-handler';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    CoreErrorHandlerModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EntitiesMockInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [HttpClientModule],
})
export class AppModule {}
