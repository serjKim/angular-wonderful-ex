import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, exhaustMap, map, shareReplay } from 'rxjs/operators';
import { ScreenObserverService } from './screen-observer.service';

export interface CollapsedResult {
  readonly collapsed: boolean;
}

@Injectable()
export class SidenavCollapseService implements OnDestroy {
  public readonly collapsed: Observable<CollapsedResult>;

  private readonly collapsed$ = new BehaviorSubject<Observable<boolean>>(of(false));
  private readonly subscription: Subscription;

  constructor(screenObserver: ScreenObserverService) {
    this.subscription = screenObserver.isSmallScreen.subscribe((matches) => {
      if (!matches && this.collapsed$.value) {
        return;
      }
      this.collapsed$.next(of(matches));
    });
    this.collapsed = this.collapsed$.pipe(
      exhaustMap((x) => x),
      distinctUntilChanged(),
      map((collapsed) => ({ collapsed })),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public setCollapsed(collapsed: Observable<boolean>): void {
    this.collapsed$.next(collapsed);
  }
}
