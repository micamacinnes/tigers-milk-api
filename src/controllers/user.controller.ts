// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/users.repository";
import { post, get, requestBody, HttpErrors, param, put, patch } from "@loopback/rest";
// import { User } from "../models/user";
import { sign, verify } from 'jsonwebtoken';
import { Donations } from "../models/donations";
import { DonationsRepository } from '../repositories/donations.repository';
import * as bcrypt from 'bcrypt';
import { RoleMapRepository } from '../repositories/role-map.repository';
import { PaymentMethodsRepository } from '../repositories/payment-methods.repository';
import { PaymentMethod } from '../models/payment-methods';
import { User } from "../models/user";

export class UsersController {
  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository,
    @repository(DonationsRepository.name) private donationsRepo: DonationsRepository,
    @repository(PaymentMethodsRepository.name) private paymentMethodRepo: PaymentMethodsRepository,
    @repository(RoleMapRepository.name) private roleMapRepo: RoleMapRepository) { }

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
  async getMe(@param.query.string('jwt') jwt: string): Promise<any> {
    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required');
    try {
      var jwtUser = verify(jwt, 'shh');
      console.log(jwtUser);
      return jwtUser;
    } catch (err) {
      throw new HttpErrors.Unauthorized('JWT token is required');

    }
  }

  @get('users/{id}/donations')
  async getDonationsByID(@param.path.number('id') id: number): Promise<Array<Donations>> {
    let userExists: boolean = !!(await this.donationsRepo.count({ id: id }));
    if (userExists) {
      throw new HttpErrors.BadRequest(`id ${id} does not have any donations`);
    }
    return await this.donationsRepo.find({
      where: {
        id: id
      }
    });
  }

  // edit Profile
  @patch('/users/{{id}}')
  async editUserInfo(@requestBody()
  updateUser: User, @param.path.number('id') id: number, @param.query.string('jwt') jwt: string): Promise<any> {

    // var user = await this.userRepo.findById(updateUser.id);
    // let newhashedPassword = await bcrypt.hash(use.password, 10);
    var jwtBody = verify(jwt, 'shh') as any;
    console.log(jwtBody);


    // return await this.userRepo.updateById(userID, user);
  }
}