import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap, publishReplay, refCount, tap } from 'rxjs/operators';
import { CoreResult, isOk } from 'src/app/core';
import { SideEffect } from '../entities-http';
import { EntitiesStorage } from '../entities-main/entities-storage';

const entityIdName = 'entityId';

@Injectable()
export class EditedEntity extends Observable<CoreResult<SideEffect | null>> {
  private readonly editedEntity$ = combineLatest([
    this.entitiesStorage.entities.pipe(mergeMap((x) => x.entities)),
    this.route.params.pipe(
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
      if (isOk(x) && !x) {
        void this.router.navigate(['entities']);
      }
    }),
    publishReplay(1),
    refCount(),
  );

  constructor(
    private readonly entitiesStorage: EntitiesStorage,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    super((subscribe) => this.editedEntity$.subscribe(subscribe));
  }
}
