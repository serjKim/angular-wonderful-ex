import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, exhaustMap, map } from 'rxjs/operators';

export interface CollapsedResult {
  readonly collapsed: boolean;
}

@Injectable()
export class SidenavCollapseService implements OnDestroy {
  public readonly collapsed: Observable<CollapsedResult>;

  private readonly collapsed$ = new BehaviorSubject<Observable<boolean>>(of(false));
  private readonly subscription: Subscription;

  constructor(breakpointObserver: BreakpointObserver) {
    this.subscription = breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches))
      .subscribe((matches) => {
        if (!matches && this.collapsed$.value) {
          return;
        }
        this.collapsed$.next(of(matches));
      });
    this.collapsed = this.collapsed$.pipe(
      exhaustMap((x) => x),
      distinctUntilChanged(),
      map((collapsed) => ({ collapsed })),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public setCollapsed(collapsed: Observable<boolean>): void {
    this.collapsed$.next(collapsed);
  }
}
