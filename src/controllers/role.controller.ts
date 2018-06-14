import { repository } from '@loopback/repository';
import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../models/role';
import {
  HttpErrors,
  get,
  param,
} from '@loopback/rest';

export class RoleController {
  constructor(
    @repository(RoleRepository) protected roleRepo: RoleRepository,
  ) { }

  @get('/roles')
  async findRoles(): Promise<Role[]> {
    return await this.roleRepo.find();
  }

  @get('/roles/{role_id}')
  async findRolesById(@param.path.number('role_id') id: number): Promise<Role> {
    // Check for valid ID
    let roleExists: boolean = !!(await this.roleRepo.count({ id }));

    if (!roleExists) {
      throw new HttpErrors.BadRequest(`role ID ${id} does not exist`);
    }

    return await this.roleRepo.findById(id);
  }
}