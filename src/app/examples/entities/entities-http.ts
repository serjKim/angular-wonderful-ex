import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreResult, wrap, wrapAsync } from '../../core';
import { Entities } from './entities-main/entities';
import { Entity, EntityId } from './models';

@Injectable({
  providedIn: 'root',
})
export class EntitiesHttp {
  constructor(private readonly http: HttpClient) {}

  public post(comment: string, onCreated: (e: Entity) => void): Observable<CoreResult<Entity>> {
    return wrapAsync(async () => {
      const e = await firstValueFrom(
        this.http
          .post('https://myend.free.beeceptor.com/', {})
          .pipe(map(() => ({ entityId: EntityId.parse(new Date().valueOf()), comment }))),
      );
      onCreated(e);
      return e;
    });
    // return of(new Date().valueOf()).pipe(
    //   delay(400),
    //   map((entityId) => ({ entityId: EntityId.parse(entityId), comment })),
    //   startWith(pending()),
    //   catchCoreError(),
    // );
  }

  public getReason(): Observable<CoreResult<string>> {
    return this.http.get<string>('https://myend.free.beeceptor.com/').pipe(
      map(() => `--${new Date().valueOf()}--`),
      wrap(),
    );
  }

  public getAll(): Observable<CoreResult<Entities>> {
    return this.http.get<string>('https://myend.free.beeceptor.com/').pipe(
      map(() => new Entities()),
      wrap(),
    );
  }
}
