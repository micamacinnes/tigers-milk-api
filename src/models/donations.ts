import { Entity, property, model } from '@loopback/repository';

@model({
    name: "donations"
})
export class Donations extends Entity {
    @property({
        type: 'number',
        id: true
    })
    donation_id?: number;

    @property({
        type: 'number',
        required: true
    })
    charity_id: number;

    @property({
        type: 'number',
        required: true
    })
    user_id: number;

    @property({
        type: 'number',
        required: true
    })
    amount_donated: number;

    @property({
        type: 'number',
        // required: true
    })
    date_donated: number;

    @property({
        type: 'number',
        // required: true
    })
    payment_id: number;
}