import { EntityId } from './entity-id';

export class Entity {
  public entityId: EntityId = EntityId.parse(0);
  public name = '';
}
