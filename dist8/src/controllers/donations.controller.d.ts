import { Donations } from "../models/donations";
import { DonationsRepository } from "../repositories/donations.repository";
import { UserRepository } from '../repositories/users.repository';
import { CharitiesRepository } from '../repositories/charities.repository';
export declare class DonationsController {
    private donationsRepo;
    private userRepo;
    private charityRepo;
    constructor(donationsRepo: DonationsRepository, userRepo: UserRepository, charityRepo: CharitiesRepository);
    getAllDonations(): Promise<Array<Donations>>;
    getDonationsByUserId(jwt: string): Promise<Donations[]>;
    createDonation(newDonation: Donations, jwt: string, charityID: number): Promise<any>;
}
