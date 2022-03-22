import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from '../../core';

import { PlaygroundComponent } from './playground.component';

@NgModule({
  imports: [CommonModule, FormsModule, CoreModule, MatInputModule, MatFormFieldModule],
  exports: [PlaygroundComponent],
  declarations: [PlaygroundComponent],
  providers: [],
})
export class PlaygroundModule {}
