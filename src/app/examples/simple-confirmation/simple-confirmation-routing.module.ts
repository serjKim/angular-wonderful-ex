import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleConfirmationComponent } from './simple-confirmation/simple-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleConfirmationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleConfirmationRoutingModule {}
