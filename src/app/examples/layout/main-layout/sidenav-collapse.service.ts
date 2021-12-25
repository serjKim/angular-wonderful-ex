import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface CollapsedResult {
  readonly collapsed: boolean;
}

@Injectable()
export class SidenavCollapseService {
  public readonly collapsed: Observable<CollapsedResult>;
  private readonly collapsed$ = new ReplaySubject<boolean>(1);

  constructor(breakpointObserver: BreakpointObserver) {
    const matched$ = breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]));
    this.collapsed = merge(matched$, this.collapsed$).pipe(
      distinctUntilChanged(),
      map((collapsed) => ({ collapsed })),
    );
  }

  public setCollapsed(collapsed: boolean): void {
    this.collapsed$.next(collapsed);
  }
}
