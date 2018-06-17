import { Entity, property, model } from '@loopback/repository';

@model({
    name: "donations"
})
export class Donations extends Entity {
    @property({
        type: 'number',
        id: true
    })
    donations_id?: number;

    @property({
        type: 'number',
        required: true
        // foreign key
    })
    charity_id: number;

    @property({
        type: 'number',
        required: true
        // foreign key
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
        // foreignKey
    })
    payment_id: number;
}