import { EntityId } from './entity-id';

export interface Entity {
  readonly entityId: EntityId;
  readonly comment: string;
}
