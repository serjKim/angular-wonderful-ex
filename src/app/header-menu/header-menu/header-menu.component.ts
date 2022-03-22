import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'wex-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMenuComponent {
  public readonly userName$ = of('User 123');

  public logout(): void {}

  public onItem2(): void {
    console.debug(1);
  }
}
