import { Injectable } from '@angular/core';
import { exhaustMap, firstValueFrom, Observable, Subject } from 'rxjs';
import { CoreResult, wrapAsync } from '../../../core';
import { shareOne } from '../../../shared';
import { EntitiesStorage } from '../entities-storage.service';
import { EntityId } from '../entity-id';

@Injectable()
export class EntityUpdater {
  public readonly updatedEntity: Observable<CoreResult<void>>;
  private readonly createdEntitySubject = new Subject<Observable<CoreResult<void>>>();

  constructor(private readonly storage: EntitiesStorage) {
    this.updatedEntity = this.createdEntitySubject.pipe(
      exhaustMap((x) => x),
      shareOne(),
    );
  }

  public update(entityId: EntityId, params: { readonly name: string }): void {
    const source$ = wrapAsync(() => {
      if (!entityId) {
        throw new Error('entity is required.');
      }
      return firstValueFrom(this.storage.updateEntity(entityId, params));
    });
    this.createdEntitySubject.next(source$);
  }
}
