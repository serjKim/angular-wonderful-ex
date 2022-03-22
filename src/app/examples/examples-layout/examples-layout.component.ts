import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExampleNavLinksStorage } from '../example-nav-links-storage.service';
import { SideNavLinksStorage } from '../../layout';

@Component({
  selector: 'wex-examples-layout',
  templateUrl: './examples-layout.component.html',
  styleUrls: ['./examples-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: SideNavLinksStorage, useClass: ExampleNavLinksStorage }],
})
export class ExamplesLayoutComponent {
  constructor() {}
}
