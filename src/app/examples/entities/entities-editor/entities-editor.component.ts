import { ChangeDetectionStrategy, Component, Host } from '@angular/core';
import { Observable } from 'rxjs';
import { Entities } from '../entities-main/entities';
import { EntitiesStorage } from '../entities-main/entities-storage';
import { EditedEntity } from './edited-entity';

@Component({
  selector: 'wex-entities-editor',
  templateUrl: './entities-editor.component.html',
  styleUrls: ['./entities-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditedEntity],
})
export class EntitiesEditorComponent {
  public readonly entities$: Observable<Entities>;

  constructor(entitiesStorage: EntitiesStorage, @Host() public readonly editedEntity$: EditedEntity) {
    this.entities$ = entitiesStorage.entities;
  }
}
