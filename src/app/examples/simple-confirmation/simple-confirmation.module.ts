import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from '../../core';
import { SimpleConfirmationRoutingModule } from './simple-confirmation-routing.module';
import {
  SimpleConfirmationComponent,
  SimpleConfirmationDialog,
} from './simple-confirmation/simple-confirmation.component';

@NgModule({
  declarations: [SimpleConfirmationComponent, SimpleConfirmationDialog],
  imports: [CommonModule, MatButtonModule, MatDialogModule, CoreModule, SimpleConfirmationRoutingModule],
})
export class SimpleConfirmationModule {}
