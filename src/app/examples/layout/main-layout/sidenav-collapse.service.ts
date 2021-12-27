import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface CollapsedResult {
  readonly collapsed: boolean;
}

@Injectable()
export class SidenavCollapseService implements OnDestroy {
  public readonly collapsed: Observable<CollapsedResult>;

  private readonly collapsed$ = new BehaviorSubject(false);
  private readonly subscription: Subscription;

  constructor(breakpointObserver: BreakpointObserver) {
    this.subscription = breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches))
      .subscribe((matches) => {
        if (!matches && this.collapsed$.value) {
          return;
        }
        this.collapsed$.next(matches);
      });
    this.collapsed = this.collapsed$.pipe(
      distinctUntilChanged(),
      map((collapsed) => ({ collapsed })),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public setCollapsed(collapsed: boolean): void {
    this.collapsed$.next(collapsed);
  }
}
