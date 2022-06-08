import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Entity } from './entity';
import { EntityId } from './entity-id';

const WINDOW = new InjectionToken('The window instance.', {
  factory: () => window,
});

@Injectable({ providedIn: 'root' })
export class EntitiesMockInterceptor implements HttpInterceptor {
  private readonly entitiesKey = 'entities';

  constructor(@Inject(WINDOW) private readonly window: Window) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/entities') && request.method === 'GET') {
      const segment = request.url.split('/').pop() ?? '';
      if (segment === 'entities') {
        return this.getAllEntities().pipe(delay(500));
      }
    }

    if (request.url.includes('/entities') && request.method === 'GET') {
      const entityId = request.url.split('/').pop() ?? '';
      const raw = this.window.localStorage.getItem(this.entitiesKey);

      if (raw == null) {
        throw new HttpErrorResponse({
          status: 404,
          error: { errors: { '': ['Error has occurred during create: Entity not found.'] } },
        });
      }

      const rawObj = JSON.parse(raw) as { entities: { entityId: number; name: string }[] };
      const entity = rawObj.entities.find((x) => x.entityId === Number(entityId));

      if (!entity) {
        throw new HttpErrorResponse({
          status: 404,
          error: { errors: { '': ['Error has occurred during create: Entity not found.'] } },
        });
      }

      return of(
        new HttpResponse({
          body: entity,
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }),
      ).pipe(delay(500));
    }

    if (request.url.includes('/entities') && request.method === 'POST') {
      const newId = new Date().valueOf();

      const entity = new Entity();
      entity.entityId = EntityId.parse(newId);

      const body = request.body as { name: string };

      if (body.name === '400') {
        throw new HttpErrorResponse({
          status: 400,
          error: { errors: { '': ['Enter an either name instead of 400', 'Another message'] } },
        });
      }

      entity.name = body.name;

      const entities = this.restoreEntities();
      entities.entities.push(entity);

      this.window.localStorage.setItem(this.entitiesKey, JSON.stringify(entities));
      return of(new HttpResponse({ status: 200, body: newId })).pipe(delay(500));
    }

    if (request.url.includes('/entities') && request.method === 'PUT') {
      const entityId = request.url.split('/').pop() ?? '';
      const entities = this.restoreEntities();
      const entity = entities.entities.find((x) => x.entityId === Number(entityId));

      if (entity == null) {
        throw new HttpErrorResponse({
          status: 404,
          error: { errors: { '': ['Error has occurred during update: Entity not found.'] } },
        });
      }

      const body = request.body as { name: string };

      if (body.name === '400') {
        throw new HttpErrorResponse({
          status: 400,
          error: { errors: { '': ['400 error raised.'] } },
        });
      }

      entity.entityId = EntityId.parse(entityId);
      entity.name = body.name;

      this.window.localStorage.setItem(this.entitiesKey, JSON.stringify(entities));
      return of(new HttpResponse({ status: 204 })).pipe(delay(500));
    }

    return next.handle(request);
  }

  private restoreEntities(): { entities: { entityId: number; name: string }[] } {
    const raw = this.window.localStorage.getItem(this.entitiesKey);
    if (!raw) {
      return { entities: [] };
    }
    return JSON.parse(raw) as { entities: { entityId: number; name: string }[] };
  }

  private getAllEntities(): Observable<HttpResponse<unknown>> {
    const raw = this.window.localStorage.getItem(this.entitiesKey);

    if (raw == null) {
      return of(
        new HttpResponse({
          status: 200,
          body: [],
        }),
      );
    }

    const rawObj = JSON.parse(raw) as { entities: { entityId: number; name: string }[] };

    return of(
      new HttpResponse({
        body: rawObj.entities,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }),
    );
  }
}
