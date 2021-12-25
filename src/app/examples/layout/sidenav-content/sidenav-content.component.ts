import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'wex-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavContentComponent {
  @Input()
  @HostBinding('class.collapsed')
  public collapsed = false;

  @Output()
  public collapse = new EventEmitter<boolean>();

  constructor() {}

  public onCollapse(): void {
    this.collapse.emit(!this.collapsed);
  }
}
