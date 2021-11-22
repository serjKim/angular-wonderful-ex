import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';
import { CoreResult, isOk } from '../../core';
import { EntitiesHttp, SideEffect } from '../entities-http';
import { Entities } from './entities';

@Injectable()
export class EntitiesStorage {
  public readonly createdEntity: Observable<CoreResult<SideEffect>>;
  public readonly entities: Observable<Entities>;

  private readonly sideEffect$ = new Subject<Observable<CoreResult<SideEffect>>>();
  private readonly entities$ = new BehaviorSubject(new Entities());

  constructor(private readonly reposService: EntitiesHttp) {
    this.entities = this.entities$.asObservable();
    this.createdEntity = this.sideEffect$.pipe(
      exhaustMap((x) => x),
      tap(this.addEntity),
    );
  }

  public create(comment: string): void {
    this.sideEffect$.next(this.reposService.post(comment));
  }

  public reload(): void {
    this.entities$.next(new Entities());
  }

  private addEntity = (se: CoreResult<SideEffect>): void => {
    if (isOk(se)) {
      this.entities$.value.add(se);
    }
  };
}
