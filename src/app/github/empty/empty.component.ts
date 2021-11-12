import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wex-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {
  constructor() {
    console.log('empty ctor.');
  }
}
