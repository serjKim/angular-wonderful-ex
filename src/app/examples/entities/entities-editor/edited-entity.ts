import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AppRouter } from '../../../app-router';
import { CoreResult, isOk } from '../../../core';
import { EntitiesStorage } from '../entities-main/entities-storage';
import { Entity } from '../models';
import { mapEntityId } from '../routing-data';

@Injectable()
export class EditedEntity extends Observable<CoreResult<Entity | null>> {
  private readonly editedEntity$ = combineLatest([
    this.entitiesStorage.entities.pipe(mergeMap((x) => x.entities)),
    this.route.params.pipe(mapEntityId()),
  ]).pipe(
    map(([ess, entityId]) => (isOk(ess) ? ess.find((s) => s.entityId === entityId) ?? null : ess)),
    tap((x) => {
      if (isOk(x) && !x) {
        void this.appRouter.entities();
      }
    }),
  );

  constructor(
    private readonly entitiesStorage: EntitiesStorage,
    private readonly route: ActivatedRoute,
    private readonly appRouter: AppRouter,
  ) {
    super((subscribe) => this.editedEntity$.subscribe(subscribe));
  }
}
