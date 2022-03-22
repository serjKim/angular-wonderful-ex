import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core';
import { ErrorsToastComponent } from './errors-toast';
import { MaterialModule } from './material';

const sharedModules = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, CoreModule, MaterialModule];
const sharedDeclarations = [ErrorsToastComponent];

@NgModule({
  declarations: sharedDeclarations,
  imports: sharedModules,
  exports: [...sharedModules, ...sharedDeclarations],
})
export class SharedModule {}
