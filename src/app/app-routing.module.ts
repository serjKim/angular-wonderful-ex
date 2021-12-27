import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { entitiesPath, githubPath } from './app-routing-data';
import { BodyLayoutComponent, MainLayoutComponent } from './examples/layout';

const routes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: githubPath,
            loadChildren: () => import('./examples/github').then((m) => m.GithubModule),
            pathMatch: 'full',
          },
          {
            path: entitiesPath,
            loadChildren: () => import('./examples/entities').then((m) => m.EntitiesModule),
          },
          {
            path: '**',
            redirectTo: '/',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
