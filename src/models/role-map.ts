import { Entity, property, model } from '@loopback/repository';

@model()
export class RoleMap extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  role_map_id?: number;

  @property({
    type: 'string',
  })
  user_id: number;

  @property({
    type: 'string',
  })
  role_id: number;

  getId() {
    return this.id;
  }
}