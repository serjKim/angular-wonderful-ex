import { Host, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';
import { CoreResult, isOk } from '../../core';
import { EntitiesHttp, SideEffect } from '../entities-http';
import { Entities } from './entities';

@Injectable()
export class EntitiesStorage {
  public readonly createdEntity: Observable<CoreResult<SideEffect>>;
  private readonly sideEffect$ = new Subject<Observable<CoreResult<SideEffect>>>();

  constructor(@Host() private readonly entities: Entities, private readonly reposService: EntitiesHttp) {
    this.createdEntity = this.sideEffect$.pipe(
      exhaustMap((x) => x),
      tap(this.addEntity),
    );
  }

  public create(comment: string): void {
    this.sideEffect$.next(this.reposService.post(comment));
  }

  public delete(item: SideEffect): void {
    this.entities.remove(item);
  }

  public update(seId: number, comment: string): void {
    this.entities.update(seId, comment);
  }

  private addEntity = (se: CoreResult<SideEffect>): void => {
    if (isOk(se)) {
      this.entities.add(se);
    }
  };
}
