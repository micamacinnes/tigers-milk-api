// Uncomment these imports to begin using these cool features!
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { UserRepository } from "../repositories/users.repository";


export class RegistrationController {
  constructor(@repository(UserRepository.name) private userRepo: UserRepository) {}


  @post('/registration')
  async createNewUser(@requestBody() user: User){

    // Check required fields
    if(!user.email|| !user.password) {
      throw new HttpErrors.BadRequest('missing data');
    }

    // Check that user does not already exist
    let userExists: boolean = !!(await this.userRepo.count({email: user.email}));

    if (userExists) {
      throw new HttpErrors.BadRequest('user already exists');
    }

    return await this.userRepo.create(user);
  }
}
