import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CoreResult, isOk } from '../../../core';
import { EntitiesStorage } from '../entities-main/entities-storage';
import { SideEffect } from '../models';
import { mapEntityId } from '../routing-data';

@Injectable()
export class EditedEntity extends Observable<CoreResult<SideEffect | null>> {
  private readonly editedEntity$ = combineLatest([
    this.entitiesStorage.entities.pipe(mergeMap((x) => x.entities)),
    this.route.params.pipe(mapEntityId()),
  ]).pipe(
    map(([ess, entityId]) => (isOk(ess) ? ess.find((s) => s.entityId === entityId) ?? null : ess)),
    tap((x) => {
      if (isOk(x) && !x) {
        void this.router.navigate(['entities']);
      }
    }),
  );

  constructor(
    private readonly entitiesStorage: EntitiesStorage,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    super((subscribe) => this.editedEntity$.subscribe(subscribe));
  }
}
