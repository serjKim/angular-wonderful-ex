import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./examples/github').then((m) => m.GithubModule),
    pathMatch: 'full',
  },
  {
    path: 'entities',
    loadChildren: () => import('./examples/entities').then((m) => m.EntitiesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
