import { RoleMapRepository } from '../repositories/role-map.repository';
import { RoleMap } from '../models/role-map';
export declare class Role_mapController {
    protected roleMapRepo: RoleMapRepository;
    constructor(roleMapRepo: RoleMapRepository);
    findRole_maps(): Promise<RoleMap[]>;
    findRole_mapsById(id: number): Promise<RoleMap>;
}
