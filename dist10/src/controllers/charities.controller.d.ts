import { Charity } from "../models/charity";
import { CharitiesRepository } from "../repositories/charities.repository";
export declare class CharitiesController {
    private charityRepo;
    constructor(charityRepo: CharitiesRepository);
    getCharity(): Promise<Array<Charity>>;
    findCharityById(charity_id: number): Promise<Charity>;
}
