import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavLinkComponent } from './nav-link';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [MainLayoutComponent, SidenavContentComponent, LayoutComponent, NavLinkComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    LayoutModule,
  ],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
