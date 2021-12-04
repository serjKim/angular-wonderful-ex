import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core';
import { EditorComponent } from './entities-editor/editor/editor.component';
import { EntitiesMainComponent } from './entities-main/entities-main.component';
import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesListComponent } from './entities-list/entities-list.component';
import { EntitiesEditorComponent } from './entities-editor/entities-editor.component';

@NgModule({
  declarations: [EntitiesMainComponent, EditorComponent, EntitiesListComponent, EntitiesEditorComponent],
  imports: [CommonModule, EntitiesRoutingModule, FormsModule, CoreModule],
})
export class EntitiesModule {}
