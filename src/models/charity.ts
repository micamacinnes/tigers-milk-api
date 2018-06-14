import { Entity, property, model } from '@loopback/repository';

@model()
export class Charity extends Entity {
    @property({
        type: 'number',
        id: true
    })
    charity_id?: number;

    @property({
        type: 'string',
        required: true
    })
    charity_name: string;

    @property({
        type: 'string',
        // required: true
    })
    desc: string;

    getId() {
        return this.id;
      }
}