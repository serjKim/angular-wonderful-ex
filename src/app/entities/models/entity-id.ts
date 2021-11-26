import { error, isError, Nominal, ResultError } from '../../core';

export type EntityId = Nominal<number, 'entities.side-effect.entityId'>;

function tryParse(raw: unknown): ResultError<Error> | EntityId {
  const entityId = Number(raw);
  return isNaN(entityId) ? error(Error("Couldn't parse entityId")) : (entityId as EntityId);
}

function parse(raw: unknown): EntityId {
  const eid = tryParse(raw);
  if (isError(eid)) {
    throw eid.err;
  }
  return eid;
}

function parseOrDefault(raw: unknown): EntityId | null {
  const eid = tryParse(raw);
  return isError(eid) ? null : eid;
}

export const EntityId = {
  tryParse,
  parse,
  parseOrDefault,
} as const;
