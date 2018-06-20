import { User } from "../models/user";
import { UserRepository } from "../repositories/users.repository";
export declare class RegistrationController {
    private userRepo;
    constructor(userRepo: UserRepository);
    createNewUser(user: User): Promise<User>;
}
