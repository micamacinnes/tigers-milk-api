import { Donations } from "../models/donations";
import { DonationsRepository } from "../repositories/donations.repository";
export declare class DonationsController {
    private donationsRepo;
    constructor(donationsRepo: DonationsRepository);
    getAllDonation(): Promise<Array<Donations>>;
    DonationsPerUser(userID: number): Promise<Donations[]>;
    newDonation(user_id: number, charity_id: number, donation_amount: number): Promise<Donations>;
}
