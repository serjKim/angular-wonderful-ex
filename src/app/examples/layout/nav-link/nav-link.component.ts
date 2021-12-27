import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavLink } from './nav-link';

@Component({
  selector: 'wex-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLinkComponent {
  @Input()
  public navLink: NavLink | null = null;

  @Input()
  public minimal = false;

  @Input()
  public child = false;
}
