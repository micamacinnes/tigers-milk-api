import { Entity, property, model } from '@loopback/repository';
import { isAbsolute } from 'path';

@model()
export class Charity extends Entity {

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        required: true
    })
    name: string;

    @property({
        type: 'string',
        required: true
    })
    about: string;

    @property({
        type: 'string',
        required: true
    })
    img: string;


    @property({
        type: 'number',
        required: true
    })
    bankID: number;

    getId() {
        return this.id;
    }

}