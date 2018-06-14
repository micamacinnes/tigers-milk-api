import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Role } from '../models/role';
import { inject } from '@loopback/core';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id
> {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(Role, datasource);
  }
}