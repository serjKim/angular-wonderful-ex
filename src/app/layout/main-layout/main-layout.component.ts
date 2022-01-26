import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenObserverService } from './screen-observer.service';
import { SidenavCollapseService } from './sidenav-collapse.service';

@Component({
  selector: 'wex-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ScreenObserverService, SidenavCollapseService],
})
export class MainLayoutComponent {
  public readonly mainCollapseCssClass$ = combineLatest([
    this.sidenavCollapse.collapsed,
    this.screenObserver.isSmallScreen,
  ]).pipe(
    map(([result, isSmallScreen]) => (!isSmallScreen ? (result.collapsed ? 'collapsed' : 'expanded') : 'collapsed')),
  );

  constructor(
    public readonly screenObserver: ScreenObserverService,
    public readonly sidenavCollapse: SidenavCollapseService,
  ) {}

  public onCollapse(collapsed: boolean): void {
    this.sidenavCollapse.setCollapsed(of(collapsed));
  }
}
