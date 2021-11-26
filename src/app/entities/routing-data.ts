import { Data } from '@angular/router';
import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityId } from './models';

export const entityIdParamName = 'entityId';

export function mapEntityId(): OperatorFunction<Data, EntityId | null> {
  return pipe(map((params) => EntityId.parseOrDefault(params[entityIdParamName])));
}
