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
    DonationsPerUserString(user_id: number): Promise<Array<string>>;
    DonationsPerCharity(charity_id: number): Promise<Array<Donations>>;
    newDonation(donation: Donations): Promise<Donations>;
    donationTotalPerUser(user_id: number): Promise<number>;
}
