import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { RoleMap } from '../models/role-map';
import { inject } from '@loopback/core';

export class RoleMapRepository extends DefaultCrudRepository<
  RoleMap,
  typeof RoleMap.prototype.id
> {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(RoleMap, datasource);
  }
}