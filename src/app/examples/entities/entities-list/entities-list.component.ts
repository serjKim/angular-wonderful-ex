import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRouter } from 'src/app/app-router';
import { Entities } from '../entities-main/entities';
import { EntitiesStorage } from '../entities-main/entities-storage';
import { SideEffect } from '../models';

@Component({
  selector: 'wex-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesListComponent {
  public readonly entitiesCollection$: Observable<Entities>;

  constructor(entitiesStorage: EntitiesStorage, private appRouter: AppRouter) {
    this.entitiesCollection$ = entitiesStorage.entities;
  }

  public deleteItem(entities: Entities, e: SideEffect): void {
    entities.remove(e);
  }

  public editItem(e: SideEffect): void {
    void this.appRouter.editEntity(e.entityId);
  }

  public trackByItem = (_: number, item: SideEffect): number => item.entityId;
}
