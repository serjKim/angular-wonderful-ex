import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { entitiesPath, githubPath } from './app-routing-data';
import { EntityId } from './examples/entities/models';

@Injectable({
  providedIn: 'root',
})
export class AppRouter {
  constructor(private readonly router: Router) {}
  public github(): Promise<boolean> {
    return this.router.navigate([githubPath]);
  }
  public entities(): Promise<boolean> {
    return this.router.navigate([entitiesPath]);
  }
  public editEntity(entityId: EntityId): Promise<boolean> {
    return this.router.navigate([entitiesPath, entityId.toString()]);
  }
}
