import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidenavCollapseService } from './sidenav-collapse.service';

@Component({
  selector: 'wex-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SidenavCollapseService],
})
export class MainLayoutComponent {
  constructor(public readonly sidenavCollapse: SidenavCollapseService) {}

  public onCollapse(collapsed: boolean): void {
    this.sidenavCollapse.setCollapsed(collapsed);
  }
}
