import { Entity, property, model } from '@loopback/repository';

@model()
export class PaymentMethod extends Entity {
    @property({
        type: 'number',
        id: true
    })
    payment_id?: number;

    @property({
        type: 'number',
        required: true
    })
    user_id: number;

    @property({
        type: 'string',
        required: true
    })
    bank: string;

    @property({
        type: 'string',
        required: true
    })
    card_number: string;

    @property({
        type: 'string',
        required: true
    })
    security_code: string;

    @property({
        type: 'string',
        required: true
    })
    exp_date: string;
    
}