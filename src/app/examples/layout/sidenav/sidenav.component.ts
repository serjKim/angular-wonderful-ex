import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SideNavLinksStorage } from './sidenav-links-storage';

@Component({
  selector: 'wex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input()
  public collapsed = false;

  @Output()
  public collapse = new EventEmitter<boolean>();

  public readonly links$ = this.linksStorage.links;

  constructor(public linksStorage: SideNavLinksStorage) {}

  public onCollapse(): void {
    this.collapse.emit(!this.collapsed);
  }
}
