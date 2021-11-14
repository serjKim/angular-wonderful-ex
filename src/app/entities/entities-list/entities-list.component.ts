import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideEffect } from '../entities-http';
import { Entities } from '../entities-main/entities';
import { EntitiesStorage } from '../entities-main/entities-storage';

@Component({
  selector: 'wex-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesListComponent {
  public readonly entities$ = this.entities.entities;

  constructor(
    private readonly entitiesStorage: EntitiesStorage,
    private readonly entities: Entities,
    private readonly router: Router,
  ) {}

  public deleteItem(e: SideEffect): void {
    this.entitiesStorage.delete(e);
  }

  public async editItem(e: SideEffect): Promise<void> {
    await this.router.navigate(['entities', e.entityId.toString()]);
  }

  public trackByItem = (_: number, item: SideEffect): number => item.entityId;
}
