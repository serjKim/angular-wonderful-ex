import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavLink } from './nav-link';

@Component({
  selector: 'wex-sidenav-link',
  templateUrl: './sidenav-link.component.html',
  styleUrls: ['./sidenav-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavLinkComponent {
  @Input()
  public navLink: NavLink | null = null;

  @Input()
  public minimal = false;

  @Input()
  public child = false;
}
