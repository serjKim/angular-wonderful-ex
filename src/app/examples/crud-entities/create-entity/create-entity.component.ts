import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreResult } from '../../../core';
import { EntityEditFormComponent } from '../entity-edit-form/entity-edit-form.component';
import { EntityCreator, EntityCreatorRouting } from './entity-creator.service';

@Component({
  selector: 'wex-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EntityCreator, EntityCreatorRouting],
})
export class CreateEntityComponent {
  public readonly createdEntity$: Observable<CoreResult<number>> = this.entityCreator.createdEntity;

  constructor(@Self() private readonly entityCreator: EntityCreator) {}

  public createEntity(editForm: EntityEditFormComponent): void {
    if (!editForm.isValid) {
      return;
    }
    this.entityCreator.createEntity(editForm.getControlValues());
  }
}
