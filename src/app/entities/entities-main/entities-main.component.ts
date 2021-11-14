import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Entities } from './entities';
import { EntitiesStorage } from './entities-storage';

@Component({
  selector: 'wex-entities-main',
  templateUrl: './entities-main.component.html',
  styleUrls: ['./entities-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Entities, EntitiesStorage],
})
export class EntitiesMainComponent {
  public allowEditor = true;
}
