import { Entity } from '@loopback/repository';
export declare class Donations extends Entity {
    id?: number;
    userID: number;
    charityID: number;
    amount: number;
    date: string;
    getId(): number | undefined;
}
