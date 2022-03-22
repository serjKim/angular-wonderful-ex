import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderMenuModule } from '../header-menu';
import { LayoutModule } from '../layout';
import { ExamplesLayoutComponent } from './examples-layout/examples-layout.component';
import { ExamplesRoutingModule } from './examples-routing.module';
import { PlaygroundModule } from './playground/playground.module';

@NgModule({
  declarations: [ExamplesLayoutComponent],
  imports: [CommonModule, ExamplesRoutingModule, PlaygroundModule, LayoutModule, HeaderMenuModule],
})
export class ExamplesModule {}
