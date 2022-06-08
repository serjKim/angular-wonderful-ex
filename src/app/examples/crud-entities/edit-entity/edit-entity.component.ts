import { ChangeDetectionStrategy, Component } from '@angular/core';
import { exhaustMap, firstValueFrom, Observable, Subject } from 'rxjs';
import { CoreResult, wrapAsync } from 'src/app/core';
import { EditedEntityStorage } from '../edited-entity-storage.service';
import { EntitiesStorage } from '../entities-storage.service';
import { Entity } from '../entity';
import { EntityEditFormComponent } from '../entity-edit-form/entity-edit-form.component';

@Component({
  selector: 'wex-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEntityComponent {
  public readonly entity$: Observable<CoreResult<Entity | null>>;
  public readonly createdEntity$: Observable<CoreResult<void>>;
  private readonly createdEntitySubject = new Subject<Observable<CoreResult<void>>>();

  constructor(private readonly storage: EntitiesStorage, editedEntityStorage: EditedEntityStorage) {
    this.entity$ = editedEntityStorage.entity;
    this.createdEntity$ = this.createdEntitySubject.pipe(exhaustMap((x) => x));
  }

  public editEntity(entity: Entity | null, editForm: EntityEditFormComponent): void {
    if (!editForm.isValid) {
      return;
    }
    const source$ = wrapAsync(() => {
      if (!entity) {
        throw new Error('entity is required.');
      }
      return firstValueFrom(this.storage.updateEntity(entity.entityId, editForm.getControlValues()));
    });
    this.createdEntitySubject.next(source$);
  }
}
