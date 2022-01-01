import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { entitiesPath, githubPath } from '../app-routing-data';
import { ExamplesLayoutComponent } from './examples-layout/examples-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesLayoutComponent,
    children: [
      {
        path: githubPath,
        loadChildren: () => import('./github').then((m) => m.GithubModule),
        pathMatch: 'full',
      },
      {
        path: entitiesPath,
        loadChildren: () => import('./entities').then((m) => m.EntitiesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
