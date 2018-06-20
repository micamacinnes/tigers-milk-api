import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Role } from '../models/role';
export declare class RoleRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
