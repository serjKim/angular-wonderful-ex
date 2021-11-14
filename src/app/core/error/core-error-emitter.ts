import { EventEmitter, Injectable } from '@angular/core';
import { CoreError } from '.';

@Injectable({
  providedIn: 'root',
})
export class CoreErrorEmitter {
  public readonly emitter = new EventEmitter<CoreError>();
}
