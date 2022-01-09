import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wex-body-layout',
  templateUrl: './body-layout.component.html',
  styleUrls: ['./body-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyLayoutComponent {
  constructor() {}
}
