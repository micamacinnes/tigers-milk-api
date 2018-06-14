import { Charity } from "../models/charity";
import { CharitiesRepository } from "../repositories/charities.repository";
export declare class CharitiesController {
    private charityRepo;
    constructor(charityRepo: CharitiesRepository);
    getCharity(): Promise<Array<Charity>>;
    findCharityById(id: number): Promise<Charity>;
}
