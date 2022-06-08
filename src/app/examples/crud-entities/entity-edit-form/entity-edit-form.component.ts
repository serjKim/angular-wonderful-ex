import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Entity } from '../entity';

@Component({
  selector: 'wex-entity-edit-form',
  templateUrl: './entity-edit-form.component.html',
  styleUrls: ['./entity-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityEditFormComponent {
  @Input()
  public set entity(val: Entity | null) {
    this.currentEntity = val;
    this.nameControl.setValue(val?.name);
  }

  public get entity(): Entity | null {
    return this.currentEntity;
  }

  public get isValid(): boolean {
    return this.nameControl.valid;
  }

  public readonly nameControl = new FormControl('', [Validators.required]);
  private currentEntity: Entity | null = null;

  public getControlValues(): { readonly name: string } {
    return { name: this.nameControl.value as string };
  }
}
