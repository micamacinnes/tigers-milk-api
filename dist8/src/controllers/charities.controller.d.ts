import { Charity } from "../models/charity";
import { CharitiesRepository } from "../repositories/charities.repository";
export declare class CharitiesController {
    private charityRepo;
    constructor(charityRepo: CharitiesRepository);
    findCharities(jwt: string): Promise<Charity[]>;
    postCharities(charity: Charity): Promise<Charity>;
    findCharityById(id: number): Promise<Charity>;
}
