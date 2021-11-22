import { BehaviorSubject, Observable } from 'rxjs';
import { delay, startWith, tap } from 'rxjs/operators';
import { pending, Pending } from '../../core';
import { SideEffect } from '../entities-http';

export class Entities {
  public readonly entities: Observable<SideEffect[] | Pending>;
  private readonly entities$ = new BehaviorSubject<SideEffect[]>([
    {
      entityId: 1636834527025,
      comment: '1636834527025',
    },
    {
      entityId: 1636834529017,
      comment: 'asd',
    },
    {
      entityId: 1636834530105,
      comment: 'test',
    },
    {
      entityId: 1636834531145,
      comment: '123',
    },
    {
      entityId: 1636834532369,
      comment: '[asd]',
    },
  ]);

  constructor() {
    this.entities = this.entities$.asObservable().pipe(
      delay(300),
      tap(() => console.log('entities list')),
      startWith(pending()),
    );
  }

  public add(se: SideEffect): void {
    this.entities$.next([...this.entities$.value, se]);
  }

  public remove(se: SideEffect): void {
    this.entities$.next([...this.entities$.value].filter((x) => x.entityId !== se.entityId));
  }

  public update(seId: number, comment: string): void {
    const arr = [...this.entities$.value];
    const se = arr.find((x) => x.entityId === seId);
    if (se) {
      const index = arr.indexOf(se);
      arr.splice(index, 1, { entityId: seId, comment });
      this.entities$.next(arr);
    }
  }
}
