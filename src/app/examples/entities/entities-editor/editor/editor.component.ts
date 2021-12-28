import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppRouter } from '../../../../app-router';
import { Entities } from '../../entities-main/entities';
import { EntitiesStorage } from '../../entities-main/entities-storage';
import { SideEffect } from '../../models';

@Component({
  selector: 'wex-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  @Input()
  public set entity(val: SideEffect | null) {
    this.currentEntity = val;
    if (this.currentEntity) {
      this.currentComment = this.currentEntity.comment;
    }
  }

  @Input()
  public entities: Entities | null = null;

  public readonly createdEntity$ = this.entitiesStorage.createdEntity;
  public readonly confirmationControl = new FormControl(true);
  public currentEntity: SideEffect | null = null;
  public currentComment = '';

  constructor(private readonly entitiesStorage: EntitiesStorage, private appRouter: AppRouter) {}

  public upsert(e: SideEffect | null): void {
    if (!e) {
      this.entitiesStorage.create(this.currentComment, this.confirmationControl.value as boolean);
    } else {
      this.entities?.update(e.entityId, this.currentComment);
    }
  }

  public addNew(): void {
    void this.appRouter.entities();
  }
}
