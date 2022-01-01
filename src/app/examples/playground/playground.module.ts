import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core';

import { PlaygroundComponent } from './playground.component';

@NgModule({
  imports: [CommonModule, FormsModule, CoreModule],
  exports: [PlaygroundComponent],
  declarations: [PlaygroundComponent],
  providers: [],
})
export class PlaygroundModule {}
