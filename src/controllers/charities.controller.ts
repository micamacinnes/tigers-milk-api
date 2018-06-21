// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Charity } from "../models/charity";
import { CharitiesRepository } from "../repositories/charities.repository";
import { verify } from "jsonwebtoken";

export class CharitiesController {
  constructor(@repository(CharitiesRepository.name) private charityRepo: CharitiesRepository) { }

  // @get('/charities')
  // async getCharity(): Promise<Array<Charity>> {
  //   return await this.charityRepo.find();
  // }

  @get('/allCharities')
    
  async findCharities(@param.query.string('jwt') jwt: string): Promise<Charity[]> {
    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');
    var allCharities = await this.charityRepo.find();
    try {
      var jwtBody = verify(jwt, 'encryption');
      return await this.charityRepo.find();
      
    } catch (err) {
      throw new HttpErrors.BadRequest('JWT token invalid');
    }
    }

  //create new charities
    @post('/charities')
    async postCharities (@requestBody() charity: Charity) {
    return await this.charityRepo.create(charity);
  }


  @get('/charity/{id}') 
        async findCharityById(@param.path.number('id') id: number): Promise<Charity> {
            let charityExists: boolean = !!(await this.charityRepo.count({id}));
            if (!charityExists){
                throw new HttpErrors.BadRequest(`user ID ${id} does not exist`);
            }
            return await this.charityRepo.findById(id);
        }
}
