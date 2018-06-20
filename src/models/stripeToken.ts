import { Entity, property, model } from '@loopback/repository';

@model()
export class stripeToken extends Entity {
    @property({
        type: 'string',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        required: true
    })
    amount: string;

}