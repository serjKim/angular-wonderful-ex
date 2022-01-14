import { ChangeDetectionStrategy, Component, Host, Self } from '@angular/core';
import { Observable } from 'rxjs';
import { Entities } from '../entities-main/entities';
import { EntitiesStorage } from '../entities-main/entities-storage';
import { EditedEntity } from './edited-entity';
import { EditedEntityEventEmitter } from './edited-entity-event-emitter';
import { EditedEntityEventHandler } from './edited-entity-event-handler';

@Component({
  selector: 'wex-entities-editor',
  templateUrl: './entities-editor.component.html',
  styleUrls: ['./entities-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditedEntityEventEmitter, EditedEntityEventHandler, EditedEntity],
})
export class EntitiesEditorComponent {
  public readonly entities$: Observable<Entities>;

  constructor(
    entitiesStorage: EntitiesStorage,
    @Host() public readonly editedEntity$: EditedEntity,
    @Self() eventHandler: EditedEntityEventHandler,
  ) {
    eventHandler.init();
    this.entities$ = entitiesStorage.entities;
  }
}
