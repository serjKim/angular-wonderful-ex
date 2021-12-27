import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavCollapseService } from './sidenav-collapse.service';

@Component({
  selector: 'wex-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SidenavCollapseService],
})
export class MainLayoutComponent {
  public readonly mainCollapseCssClass$ = this.sidenavCollapse.collapsed.pipe(
    map((result) => (result.collapsed ? 'collapsed' : 'expanded')),
  );

  constructor(public readonly sidenavCollapse: SidenavCollapseService) {}

  public onCollapse(collapsed: boolean): void {
    this.sidenavCollapse.setCollapsed(of(collapsed));
  }
}
