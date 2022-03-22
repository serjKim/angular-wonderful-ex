import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { HeaderMenuComponent } from './header-menu/header-menu.component';

@NgModule({
  declarations: [HeaderMenuComponent],
  imports: [SharedModule],
  exports: [HeaderMenuComponent],
})
export class HeaderMenuModule {}
