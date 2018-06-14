// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/users.repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
// import { User } from "../models/user";
import { sign, verify } from 'jsonwebtoken';

export class UsersController {
  constructor(@repository(UserRepository.name) private userRepo: UserRepository) { }

  @get('/users')
  async getAllUsers(@param.query.string('jwt') jwt: string): Promise<any> {
    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required');

    try {
      var jwtBody = verify(jwt, 'shh');
      console.log(jwtBody);
      return jwtBody;
    } catch (err) {
      throw new HttpErrors.Unauthorized('JWT token is required');

    }
    // return await this.userRepo.find();
  }

  //http://localhost:3000/me?jwt=thetoken

  @get('/me')
  async getMe(@param.query.string('jwt') jwt:string): Promise<any> {
    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required');
    try {
      var jwtUser = verify(jwt, 'shh');
      console.log(jwtUser);
      return jwtUser;
    } catch (err) {
      throw new HttpErrors.Unauthorized('JWT token is required');

    }
  }
}