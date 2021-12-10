import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from '../../core';
import { EditorComponent } from './entities-editor/editor/editor.component';
import { EntitiesMainComponent } from './entities-main/entities-main.component';
import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesListComponent } from './entities-list/entities-list.component';
import { EntitiesEditorComponent } from './entities-editor/entities-editor.component';
import { CreateDialogComponent } from './entities-editor/create-dialog/create-dialog.component';

@NgModule({
  declarations: [
    EntitiesMainComponent,
    EditorComponent,
    EntitiesListComponent,
    EntitiesEditorComponent,
    CreateDialogComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, EntitiesRoutingModule, FormsModule, CoreModule],
})
export class EntitiesModule {}
