import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class ScreenObserver {
  public readonly isSmallScreen: Observable<boolean>;
  constructor(breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches));
  }
}
