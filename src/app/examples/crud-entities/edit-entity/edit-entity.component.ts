import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreResult } from 'src/app/core';
import { EditedEntityStorage } from '../edited-entity-storage.service';
import { Entity } from '../entity';
import { EntityEditFormComponent } from '../entity-edit-form/entity-edit-form.component';
import { EntityId } from '../entity-id';
import { EntityUpdater } from './entity-updater.service';

@Component({
  selector: 'wex-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EntityUpdater],
})
export class EditEntityComponent {
  public readonly entity$: Observable<CoreResult<Entity | null>>;
  public readonly updatedEntity$: Observable<CoreResult<EntityId>> = this.entityUpdater.updatedEntity;
  public showEditor = true;

  constructor(@Self() private readonly entityUpdater: EntityUpdater, editedEntityStorage: EditedEntityStorage) {
    this.entity$ = editedEntityStorage.entity;
  }

  public editEntity(entity: Entity | null, editForm: EntityEditFormComponent): void {
    if (!editForm.isValid) {
      return;
    }
    if (!entity) {
      throw new Error('Entity is required.');
    }
    this.entityUpdater.update(entity.entityId, editForm.getControlValues());
  }
}
