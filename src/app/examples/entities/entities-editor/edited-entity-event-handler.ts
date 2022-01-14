import { Injectable, OnDestroy, Self } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppRouter } from 'src/app/app-router';
import { EditedEntityEvent, EditedEntityEventEmitter } from './edited-entity-event-emitter';

@Injectable()
export class EditedEntityEventHandler implements OnDestroy {
  private readonly sub = new Subscription();
  constructor(@Self() private readonly eventEmitter: EditedEntityEventEmitter, private readonly appRouter: AppRouter) {}
  public init(): void {
    this.sub.add(
      this.eventEmitter.subscribe((e) => {
        if (e === EditedEntityEvent.None) {
          void this.appRouter.entities();
        }
      }),
    );
  }
  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
