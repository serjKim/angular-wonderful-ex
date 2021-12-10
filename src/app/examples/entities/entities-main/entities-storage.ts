import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';
import { CoreResult, isOk } from '../../../core';
import { CreateConfirmation } from '../entities-editor/create-confirmation';
import { EntitiesHttp } from '../entities-http';
import { SideEffect } from '../models';
import { Entities } from './entities';

@Injectable()
export class EntitiesStorage {
  public readonly createdEntity: Observable<CoreResult<SideEffect | null>>;
  public readonly entities: Observable<Entities>;

  private readonly sideEffect$ = new Subject<Observable<CoreResult<SideEffect | null>>>();
  private readonly entities$ = new BehaviorSubject(new Entities());

  constructor(
    private readonly entitiesHttp: EntitiesHttp,
    public readonly dialog: MatDialog,
    private readonly confirmation: CreateConfirmation,
  ) {
    this.entities = this.entities$.asObservable();
    this.createdEntity = this.sideEffect$.pipe(exhaustMap((x) => x));
  }

  public create(comment: string, showConfirmation: boolean): void {
    const source$ = this.entitiesHttp.getReason().pipe(
      exhaustMap((reason) => {
        if (!isOk(reason)) {
          return of(reason);
        }
        return showConfirmation ? this.confirmation.openDialog(reason).pipe(map((ok) => (ok ? reason : null))) : of('');
      }),
      mergeMap((reason: CoreResult<string | null>) => {
        if (!isOk(reason)) {
          return of(reason);
        }
        return reason != null ? this.entitiesHttp.post(comment + reason, this.addEntity) : of(null);
      }),
    );
    this.sideEffect$.next(source$);
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
