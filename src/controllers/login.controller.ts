// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { UserRepository } from "../repositories/users.repository";
import { request } from "http";
// import {Login} from '../models/login';
import {sign, verify} from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class LoginController {
  constructor(@repository(UserRepository.name) private userRepo: UserRepository) { }

  @post('/login')
  async login(@requestBody() login: User): Promise<any> {
    var users = await this.userRepo.find();

    var email = login.email;
    var password = await bcrypt.hash(login.password, 10);

    for (var i = 0; i < users.length; i++) {
      var user = users[i];

     // find the user by email address if not...(look at Perry's code)
      
      if (user.email == email && await bcrypt.compare(login.password, user.password)) {

        var jwt = sign(
          {
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
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
