import { CoreResultError } from '../error';
import { Pending } from './pending';

export type CoreResult<T> = T | CoreResultError | Pending;
