import { LayoutModule as MdlLayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { BodyLayoutComponent } from './body-layout/body-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SideNavLinkComponent } from './sidenav-link';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [MainLayoutComponent, SidenavComponent, BodyLayoutComponent, SideNavLinkComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MdlLayoutModule,
  ],
  exports: [MainLayoutComponent, BodyLayoutComponent],
})
export class LayoutModule {}
