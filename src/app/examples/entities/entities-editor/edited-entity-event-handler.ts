import { Injectable, OnDestroy, Self } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppRouter } from 'src/app/app-router';
import { EditedEntityEvent, EditedEntityEventEmitter } from './edited-entity-event-emitter';

@Injectable()
export class EditedEntityEventHandler implements OnDestroy {
  private readonly sub: Subscription;
  constructor(@Self() eventEmitter: EditedEntityEventEmitter, appRouter: AppRouter) {
    this.sub = eventEmitter.emitter.subscribe((e) => {
      if (e === EditedEntityEvent.None) {
        void appRouter.entities();
      }
    });
  }
  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
