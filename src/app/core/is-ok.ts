import { CoreResultError, isError } from './error';
import { isPending, Pending } from './pending';

export function isOk<T>(o: T | CoreResultError | Pending): o is T {
  return !isError(o) && !isPending(o);
}
