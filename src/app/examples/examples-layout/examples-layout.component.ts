import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wex-examples-layout',
  templateUrl: './examples-layout.component.html',
  styleUrls: ['./examples-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesLayoutComponent {
  constructor() {}
}
