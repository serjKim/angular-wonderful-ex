import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { NavLinkComponent } from './nav-link';

@NgModule({
  declarations: [MainLayoutComponent, SidenavContentComponent, LayoutComponent, NavLinkComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
  ],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
