import { EntityId } from './entity-id';

export interface SideEffect {
  readonly entityId: EntityId;
  readonly comment: string;
}
