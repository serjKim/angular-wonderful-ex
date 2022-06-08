import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CanEditEntityGuard } from './can-edit-entity.guard';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { EditEntityComponent } from './edit-entity/edit-entity.component';
import { EditedEntityStorage } from './edited-entity-storage.service';
import { EntityEditFormComponent } from './entity-edit-form/entity-edit-form.component';
import { CrudEntitiesRoutingModule } from './crud-entities-routing.module';
import { CrudEntityListComponent } from './crud-entity-list/crud-entity-list.component';
import { EntitiesStorage } from './entities-storage.service';

@NgModule({
  declarations: [EditEntityComponent, EntityEditFormComponent, CreateEntityComponent, CrudEntityListComponent],
  imports: [SharedModule, CrudEntitiesRoutingModule],
  providers: [CanEditEntityGuard, EditedEntityStorage, EntitiesStorage],
})
export class CrudEntitiesModule {}
