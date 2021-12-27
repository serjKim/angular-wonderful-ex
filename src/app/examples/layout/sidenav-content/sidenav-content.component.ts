import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavLink } from '../nav-link';

@Component({
  selector: 'wex-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavContentComponent {
  @Input()
  public collapsed = false;

  @Output()
  public collapse = new EventEmitter<boolean>();

  public links: NavLink[] = [
    new NavLink(
      ['entities'],
      'An entities direct link and very long text',
      'folder',
      of('9'),
      of([
        new NavLink(['entities', 1636834527025], '1636834527025', 'description', of('1')),
        new NavLink(['entities', 1636834527025], 'Another one', 'description'),
        new NavLink(['entities', 1636834527025], 'Another two', 'description'),
        new NavLink(['entities', 1636834527025], 'Link three', 'description'),
      ]),
    ),
    new NavLink(['github'], 'Github', 'settings', of('8')),
    new NavLink(['a', 'b', 'c'], 'A link', 'calendar_today', of('99')),
    new NavLink(['a', 'b', 'c'], 'Wrong link', 'favorite', of(null)),
    new NavLink(['a', 'b', 'c'], 'A link with a very long long text', 'home'),
    new NavLink(['a', 'b', 'c'], 'Another link', 'fingerprint', interval(1000).pipe(map((x) => x.toString()))),
  ];

  constructor() {}

  public onCollapse(): void {
    this.collapse.emit(!this.collapsed);
  }
}
