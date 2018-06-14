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
}