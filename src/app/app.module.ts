import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { ErrorToastModule } from './error-toast';
import { GlobalErrorHandler } from './global-error.handler';
import { PlaygroundComponent } from './examples/playground/playground.component';

@NgModule({
  declarations: [AppComponent, PlaygroundComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, ErrorToastModule, HttpClientModule, FormsModule],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
  bootstrap: [AppComponent],
  exports: [HttpClientModule],
})
export class AppModule {}
