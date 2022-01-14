import { EventEmitter, Injectable } from '@angular/core';

export const enum EditedEntityEvent {
  None,
}

@Injectable()
export class EditedEntityEventEmitter {
  public readonly emitter = new EventEmitter<EditedEntityEvent>();
}
