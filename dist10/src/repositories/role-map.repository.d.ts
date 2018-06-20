import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { RoleMap } from '../models/role-map';
export declare class RoleMapRepository extends DefaultCrudRepository<RoleMap, typeof RoleMap.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
