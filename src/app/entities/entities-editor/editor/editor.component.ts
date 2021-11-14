import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SideEffect } from '../../entities-http';
import { EntitiesStorage } from '../../entities-main/entities-storage';

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

  public readonly createdEntity$ = this.entitiesStorage.createdEntity;
  public currentEntity: SideEffect | null = null;
  public currentComment = '';

  constructor(private readonly entitiesStorage: EntitiesStorage, private readonly router: Router) {}

  public upsert(e: SideEffect | null): void {
    if (!e) {
      this.entitiesStorage.create(this.currentComment);
    } else {
      this.entitiesStorage.update(e.entityId, this.currentComment);
    }
  }

  public addNew(): void {
    void this.router.navigate(['entities']);
  }
}
