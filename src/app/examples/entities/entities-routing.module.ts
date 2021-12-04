import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesEditorComponent } from './entities-editor/entities-editor.component';
import { EntitiesMainComponent } from './entities-main/entities-main.component';
import { entityIdParamName } from './routing-data';

const routes: Routes = [
  {
    path: '',
    component: EntitiesMainComponent,
    children: [
      {
        path: '',
        component: EntitiesEditorComponent,
        pathMatch: 'full',
      },
      {
        path: `:${entityIdParamName}`,
        component: EntitiesEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntitiesRoutingModule {}
