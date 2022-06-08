import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, switchAll } from 'rxjs';
import { CoreResult } from 'src/app/core';
import { shareLast } from 'src/app/shared';
import { EntitiesStorage } from './entities-storage.service';
import { Entity } from './entity';

@Injectable()
export class EditedEntityStorage {
  /**
   * Gets the current edited entity.
   */
  public readonly entity: Observable<CoreResult<Entity | null>>;

  private readonly entity$ = new ReplaySubject<Observable<CoreResult<Entity | null>>>(1);

  constructor(private readonly entitiesStorage: EntitiesStorage) {
    this.entity = this.entity$.pipe(switchAll());
  }

  public load(entityId: number): void {
    const entity = this.entitiesStorage.getEntity(entityId).pipe(shareLast());
    this.entity$.next(entity);
  }
}
