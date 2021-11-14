import { isPending } from './pending';
import { isError } from './result-error';
import { CoreResult } from './core-result';

export function isOk<T>(o: CoreResult<T>): o is T {
  return !isError(o) && !isPending(o);
}
