import { coreError, CoreResultError, isError, Nominal } from '../../core';

export type EntityId = Nominal<number, 'ereq.entity.entityId'>;

type MaybeEntityId = number | string | null | undefined;

function tryParse(this: void, value: MaybeEntityId): EntityId | CoreResultError {
  const num = typeof value === 'number' ? value : parseInt(value as string, 10);
  if (isNaN(num)) {
    return coreError(Error(`${value as string} is not a number.`));
  }
  if (num < 0) {
    return coreError(Error(`${num} must be a positive number.`));
  }
  return num as EntityId;
}

function parse(this: void, value: MaybeEntityId): EntityId {
  const result = tryParse(value);
  if (isError(result)) {
    throw result;
  }
  return result;
}

function parseOrNull(this: void, value: MaybeEntityId): EntityId | null {
  const result = tryParse(value);
  return isError(result) ? null : result;
}

export const EntityId = {
  tryParse,
  parse,
  parseOrNull,
};
