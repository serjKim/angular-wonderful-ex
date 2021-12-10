import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor(entitiesStorage: EntitiesStorage, private readonly router: Router, private ar: ActivatedRoute) {
    this.entitiesCollection$ = entitiesStorage.entities;
  }

  public deleteItem(entities: Entities, e: SideEffect): void {
    entities.remove(e);
  }

  public async editItem(e: SideEffect): Promise<void> {
    await this.router.navigate([e.entityId.toString()], { relativeTo: this.ar });
  }

  public trackByItem = (_: number, item: SideEffect): number => item.entityId;
}
