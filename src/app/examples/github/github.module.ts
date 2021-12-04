import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from '../../core';
import { GithubRoutingModule } from './github-routing.module';
import { ReposComponent } from './repos/repos.component';

@NgModule({
  declarations: [ReposComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    GithubRoutingModule,
    CoreModule,
  ],
})
export class GithubModule {}
