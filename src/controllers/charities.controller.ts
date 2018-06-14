// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Charity } from "../models/charity";
import { CharitiesRepository } from "../repositories/charities.repository";

export class CharitiesController {
  constructor(@repository(CharitiesRepository.name) private charityRepo: CharitiesRepository) { }

  @get('/charities')
  async getCharity(): Promise<Array<Charity>> {
    return await this.charityRepo.find();
  }

  @get('/charities/{id}')
  async findCharityById(@param.path.number('id') id: number): Promise<Charity> {
    // Check for valid ID
    let charityExists: boolean = !!(await this.charityRepo.count({ id }));

    if (!charityExists) {
      throw new HttpErrors.BadRequest(`charity ID ${id} does not exist`);
    }

    return await this.charityRepo.findById(id);

  }
}
