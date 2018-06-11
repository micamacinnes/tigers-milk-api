import { User } from "../models/user";
import { UserRepository } from "../repositories/users.repository";
export declare class LoginController {
    private userRepo;
    constructor(userRepo: UserRepository);
    login(login: User): Promise<any>;
}
