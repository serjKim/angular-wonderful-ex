import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { isOk } from '../../../core';
import { EntitiesStorage } from '../entities-storage.service';

@Component({
  selector: 'wex-crud-entity-list',
  templateUrl: './crud-entity-list.component.html',
  styleUrls: ['./crud-entity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudEntityListComponent {
  public readonly entities$ = this.storage.getAllEntities().pipe(
    map((x) =>
      isOk(x)
        ? x.map((e) => ({
            url: ['edit', e.entityId],
            name: e.name,
          }))
        : x,
    ),
  );

  constructor(private readonly storage: EntitiesStorage) {}
}
