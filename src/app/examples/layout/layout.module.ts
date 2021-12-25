import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [MainLayoutComponent, SidenavContentComponent, LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    LayoutModule,
  ],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
