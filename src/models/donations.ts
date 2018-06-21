import { Entity, property, model } from '@loopback/repository';

@model()
export class Donations extends Entity {

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        required: true
    })
    userID: number;

    @property({
        type: 'number',
        required: true
    })
    charityID: number;

    @property({
        type: 'number',
        required: true
    })
    amount: number;

    @property({
        type: 'string',
        required: true
    })
    date: string;

    getId() {
        return this.id;
    }

}