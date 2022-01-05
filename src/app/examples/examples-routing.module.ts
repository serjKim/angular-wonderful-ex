import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { entitiesPath, githubPath, playgroundPath, simpleConfirmationPath } from '../app-routing-data';
import { ExamplesLayoutComponent } from './examples-layout/examples-layout.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesLayoutComponent,
    children: [
      {
        path: playgroundPath,
        component: PlaygroundComponent,
      },
      {
        path: githubPath,
        loadChildren: () => import('./github').then((m) => m.GithubModule),
      },
      {
        path: entitiesPath,
        loadChildren: () => import('./entities').then((m) => m.EntitiesModule),
      },
      {
        path: simpleConfirmationPath,
        loadChildren: () => import('./simple-confirmation').then((m) => m.SimpleConfirmationModule),
      },
      {
        path: '**',
        redirectTo: `/${playgroundPath}`,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
