import { Entity } from '@loopback/repository';
export declare class Donations extends Entity {
    donations_id?: number;
    charity_id: number;
    user_id: number;
    amount_donated: number;
    date_donated: number;
    payment_id: number;
}
