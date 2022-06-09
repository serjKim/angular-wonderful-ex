import { Injectable } from '@angular/core';
import { exhaustMap, firstValueFrom, Observable, Subject } from 'rxjs';
import { CoreResult, wrapAsync } from '../../../core';
import { EditedEntityStorage } from '../edited-entity-storage.service';
import { EntitiesStorage } from '../entities-storage.service';
import { EntityId } from '../entity-id';

@Injectable()
export class EntityUpdater {
  public readonly updatedEntity: Observable<CoreResult<EntityId>>;
  private readonly updatedEntitySubject = new Subject<Observable<CoreResult<EntityId>>>();

  constructor(private readonly storage: EntitiesStorage, private readonly editedEntityStorage: EditedEntityStorage) {
    this.updatedEntity = this.updatedEntitySubject.pipe(exhaustMap((x) => x));
  }

  public update(entityId: EntityId, params: { readonly name: string }): void {
    const source$ = wrapAsync(async () => {
      if (!entityId) {
        throw new Error('entity is required.');
      }
      await firstValueFrom(this.storage.updateEntity(entityId, params));
      this.editedEntityStorage.load(entityId);
      return entityId;
    });
    this.updatedEntitySubject.next(source$);
  }
}
