import { EventEmitter, Injectable } from '@angular/core';
import { CoreError } from '../error';

@Injectable({
  providedIn: 'root',
})
export class UnwrapService {
  public readonly raiseError = new EventEmitter<CoreError>();
}
