import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanEditEntityGuard } from './can-edit-entity.guard';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { EditEntityComponent } from './edit-entity/edit-entity.component';
import { CrudEntityListComponent } from './crud-entity-list/crud-entity-list.component';
import { entityIdParamName } from './routing-data';

const routes: Routes = [
  {
    path: '',
    component: CrudEntityListComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateEntityComponent,
  },
  {
    path: `edit/:${entityIdParamName}`,
    canActivate: [CanEditEntityGuard],
    component: EditEntityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudEntitiesRoutingModule {}
