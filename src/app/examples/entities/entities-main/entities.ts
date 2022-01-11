import { BehaviorSubject, Observable } from 'rxjs';
import { delay, startWith, tap } from 'rxjs/operators';
import { pending, Pending } from '../../../core';
import { Entity, EntityId } from '../models';

export class Entities {
  public readonly entities: Observable<Entity[] | Pending>;
  private readonly entities$ = new BehaviorSubject<Entity[]>([
    {
      entityId: EntityId.parse(1636834527025),
      comment: '1636834527025',
    },
    {
      entityId: EntityId.parse(1636834529017),
      comment: 'asd',
    },
    {
      entityId: EntityId.parse(1636834530105),
      comment: 'test',
    },
    {
      entityId: EntityId.parse(1636834531145),
      comment: '123',
    },
    {
      entityId: EntityId.parse(1636834532369),
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

  public add(e: Entity): void {
    this.entities$.next([...this.entities$.value, e]);
  }

  public remove(e: Entity): void {
    this.entities$.next([...this.entities$.value].filter((x) => x.entityId !== e.entityId));
  }

  public update(seId: EntityId, comment: string): void {
    const arr = [...this.entities$.value];
    const se = arr.find((x) => x.entityId === seId);
    if (se) {
      const index = arr.indexOf(se);
      arr.splice(index, 1, { entityId: seId, comment });
      this.entities$.next(arr);
    }
  }
}
