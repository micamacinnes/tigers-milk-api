import { Entity } from '@loopback/repository';
export declare class PaymentMethod extends Entity {
    payment_id?: number;
    user_id: number;
    bank: string;
    card_number: string;
    security_code: string;
    exp_date: string;
}
