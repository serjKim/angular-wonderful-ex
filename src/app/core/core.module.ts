import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnwrapDirective } from './unwrap/unwrap.directive';

@NgModule({
  declarations: [UnwrapDirective],
  imports: [CommonModule],
  exports: [UnwrapDirective],
})
export class CoreModule {}
