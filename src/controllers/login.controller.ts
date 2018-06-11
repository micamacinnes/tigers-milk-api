import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { UserRepository } from "../repositories/users.repository";
import { request } from "http";
// import {Login} from '../models/login';
import {sign, verify} from 'jsonwebtoken';

export class LoginController {
  constructor(@repository(UserRepository.name) private userRepo: UserRepository) { }

  @post('/login')
  async login(@requestBody() login: User): Promise<any> {
    var users = await this.userRepo.find();

    var email = login.email;
    var password = login.password;

    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if (user.email == email && user.password == password) {
        
        var jwt = sign(
          {
            user: {
              id: user.user_id,
              firstname: user.firstname,
              email: user.email
            },
            anything: "hello",
          },
          'shh',
          {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za',
          },
        );

        return {
          token: jwt,
        };
      }
    }

    throw new HttpErrors.NotFound('User not found, sorry!');
  }
}
