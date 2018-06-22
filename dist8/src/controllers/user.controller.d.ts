import { UserRepository } from "../repositories/users.repository";
import { Donations } from "../models/donations";
import { DonationsRepository } from '../repositories/donations.repository';
import { RoleMapRepository } from '../repositories/role-map.repository';
import { PaymentMethodsRepository } from '../repositories/payment-methods.repository';
import { User } from "../models/user";
export declare class UsersController {
    private userRepo;
    private donationsRepo;
    private paymentMethodRepo;
    private roleMapRepo;
    constructor(userRepo: UserRepository, donationsRepo: DonationsRepository, paymentMethodRepo: PaymentMethodsRepository, roleMapRepo: RoleMapRepository);
    getAllUsers(jwt: string): Promise<any>;
    getMe(jwt: string): Promise<any>;
    getDonationsByID(id: number): Promise<Array<Donations>>;
    editUserInfo(jwt: string, obj: Partial<User>): Promise<any>;
}
