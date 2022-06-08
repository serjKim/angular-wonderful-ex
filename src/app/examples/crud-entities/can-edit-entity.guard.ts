import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, skipWhile } from 'rxjs';
import { isError, isPending } from '../../core';
import { EditedEntityStorage } from './edited-entity-storage.service';
import { EntityId } from './entity-id';
import { entityIdParamName } from './routing-data';

@Injectable()
export class CanEditEntityGuard implements CanActivate {
  constructor(private readonly editedEntityStorage: EditedEntityStorage, private readonly router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const entityId = EntityId.parse(route.paramMap.get(entityIdParamName));

    this.editedEntityStorage.load(entityId);

    return this.editedEntityStorage.entity.pipe(
      skipWhile((x) => isPending(x)),
      map((entity) => {
        if (isError(entity)) {
          throw new Error("Couldn't load entity" /* , { cause: entity } */);
        }
        if (entity == null) {
          return this.router.createUrlTree(['crud-entities']);
        }
        return true;
      }),
    );
  }
}
