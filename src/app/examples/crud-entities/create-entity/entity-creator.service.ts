import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { exhaustMap, firstValueFrom, Observable, ReplaySubject } from 'rxjs';
import { CoreResult, wrapAsync } from '../../../core';
import { shareOne } from '../../../shared';
import { EntitiesStorage } from '../entities-storage.service';
import { EntityId } from '../entity-id';

@Injectable()
export class EntityCreatorRouting {
  constructor(private readonly router: Router) {}
  public goToEdit(entityId: EntityId): Promise<boolean> {
    return this.router.navigate(['crud-entities', 'edit', entityId]);
  }
}

interface CreateEntityParams {
  readonly name: string;
}

@Injectable()
export class EntityCreator {
  public readonly createdEntity: Observable<CoreResult<number>>;
  private readonly createdEntitySubject = new ReplaySubject<Observable<CoreResult<number>>>(1);

  constructor(private readonly storage: EntitiesStorage, private readonly routing: EntityCreatorRouting) {
    this.createdEntity = this.createdEntitySubject.pipe(exhaustMap((x) => x));
  }

  public createEntity(params: CreateEntityParams): void {
    const source$ = wrapAsync(async () => {
      const newId = await firstValueFrom(this.storage.createEntity(params));
      await this.routing.goToEdit(newId);
      return newId;
    });
    this.createdEntitySubject.next(source$.pipe(shareOne()));
  }
}
