import { UserRepository } from "../repositories/users.repository";
export declare class UsersController {
    private userRepo;
    constructor(userRepo: UserRepository);
    getAllUsers(jwt: string): Promise<any>;
    getMe(jwt: string): Promise<any>;
}
