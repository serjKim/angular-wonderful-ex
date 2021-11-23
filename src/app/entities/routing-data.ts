import { Data } from '@angular/router';
import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const entityIdParamName = 'entityId';

export function mapEntityId(): OperatorFunction<Data, number | null> {
  return pipe(
    map((params) => {
      const entityId = Number(params[entityIdParamName]);
      return isNaN(entityId) ? null : entityId;
    }),
  );
}
