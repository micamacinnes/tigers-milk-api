import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../models/role';
export declare class RoleController {
    protected roleRepo: RoleRepository;
    constructor(roleRepo: RoleRepository);
    findRoles(): Promise<Role[]>;
}
