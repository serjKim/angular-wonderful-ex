import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { CoreResult, isError, Pending, pending, wrap } from '../../core';
import { Entity } from './entity';
import { EntityId } from './entity-id';

interface RawEntity {
  readonly entityId: number;
  readonly name: string;
}

@Injectable()
export class EntitiesStorage {
  constructor(private readonly http: HttpClient) {}

  public getAllEntities(): Observable<Entity[] | Pending> {
    return this.http.get<RawEntity[]>('api/entities').pipe(
      map((obj) => obj.map(this.deserializeEntity)),
      startWith(pending()),
    );
  }

  public getEntity(entityId: number): Observable<CoreResult<Entity | null>> {
    return this.http.get<RawEntity>(`api/entities/${entityId}`).pipe(
      map(this.deserializeEntity),
      wrap(),
      map((entity) => {
        if (isError(entity) && entity.err instanceof HttpErrorResponse && entity.err.status === 404) {
          return null;
        }
        return entity;
      }),
    );
  }

  public createEntity(req: { readonly name: string }): Observable<EntityId> {
    return this.http.post<number>('api/entities', req).pipe(map((x) => EntityId.parse(x)));
  }

  public updateEntity(entityId: number, req: { readonly name: string }): Observable<void> {
    return this.http.put<void>(`api/entities/${entityId}`, req);
  }

  private deserializeEntity = (re: RawEntity): Entity => {
    const entity = new Entity();
    entity.entityId = EntityId.parse(re.entityId);
    entity.name = re.name;
    return entity;
  };
}
