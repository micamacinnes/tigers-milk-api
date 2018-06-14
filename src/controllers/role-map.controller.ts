import { repository } from '@loopback/repository';
import { RoleMapRepository } from '../repositories/role-map.repository';
import { RoleMap } from '../models/role-map';
import {
  HttpErrors,
  get,
  param,
} from '@loopback/rest';

export class Role_mapController {
  constructor(
    @repository(RoleMapRepository) protected roleMapRepo: RoleMapRepository,
  ) { }

  @get('/role_maps')
  async findRole_maps(): Promise<RoleMap[]> {
    return await this.roleMapRepo.find();
  }

  @get('/role_maps/{id}')
  async findRole_mapsById(@param.path.number('id') id: number): Promise<RoleMap> {
    // Check for valid ID
    let role_mapExists: boolean = !!(await this.roleMapRepo.count({ id }));

    if (!role_mapExists) {
      throw new HttpErrors.BadRequest(`role_map ID ${id} does not exist`);
    }

    return await this.roleMapRepo.findById(id);
  }
}