import { EventEmitter, Injectable } from '@angular/core';

export const enum EditedEntityEvent {
  None,
}

@Injectable()
export class EditedEntityEventEmitter extends EventEmitter<EditedEntityEvent> {}
