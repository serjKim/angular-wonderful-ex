import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, publishReplay, refCount, tap } from 'rxjs/operators';
import { CoreResult, isOk } from 'src/app/core';
import { SideEffect } from '../entities-http';
import { Entities } from '../entities-main/entities';

const entityIdName = 'entityId';

@Component({
  selector: 'wex-entities-editor',
  templateUrl: './entities-editor.component.html',
  styleUrls: ['./entities-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesEditorComponent {
  public readonly currentEntity$: Observable<CoreResult<SideEffect | null>>;

  constructor(entities: Entities, route: ActivatedRoute, router: Router) {
    this.currentEntity$ = combineLatest([
      entities.entities,
      route.params.pipe(
        map((params) => {
          const entityId = Number(params[entityIdName]);
          return isNaN(entityId) ? null : entityId;
        }),
      ),
    ]).pipe(
      map(([ess, entityId]) => {
        if (!isOk(ess)) {
          return ess;
        }
        return ess.find((s) => s.entityId === entityId) ?? null;
      }),
      tap((x) => {
        if (!x) {
          void router.navigate(['entities']);
        }
      }),
      publishReplay(1),
      refCount(),
    );
  }
}
