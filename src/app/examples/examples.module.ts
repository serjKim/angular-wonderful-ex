import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExamplesLayoutComponent } from './examples-layout/examples-layout.component';
import { ExamplesRoutingModule } from './examples-routing.module';
import { LayoutModule } from './layout';
import { PlaygroundModule } from './playground/playground.module';

@NgModule({
  declarations: [ExamplesLayoutComponent],
  imports: [CommonModule, ExamplesRoutingModule, PlaygroundModule, LayoutModule],
})
export class ExamplesModule {}
