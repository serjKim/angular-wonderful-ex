import { Injectable, Self } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CoreResult, isOk } from '../../../core';
import { EntitiesStorage } from '../entities-main/entities-storage';
import { Entity } from '../models';
import { mapEntityId } from '../routing-data';
import { EditedEntityEvent, EditedEntityEventEmitter } from './edited-entity-event-emitter';

@Injectable()
export class EditedEntity extends Observable<CoreResult<Entity | null>> {
  private readonly editedEntity$ = combineLatest([
    this.entitiesStorage.entities.pipe(mergeMap((x) => x.entities)),
    this.route.params.pipe(mapEntityId()),
  ]).pipe(
    map(([ess, entityId]) => (isOk(ess) ? ess.find((s) => s.entityId === entityId) ?? null : ess)),
    tap((x) => {
      if (isOk(x) && !x) {
        this.eventEmitter.emitter.emit(EditedEntityEvent.None);
      }
    }),
  );

  constructor(
    private readonly entitiesStorage: EntitiesStorage,
    private readonly route: ActivatedRoute,
    @Self() private readonly eventEmitter: EditedEntityEventEmitter,
  ) {
    super((subscribe) => this.editedEntity$.subscribe(subscribe));
  }
}
