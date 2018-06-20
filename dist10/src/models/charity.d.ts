import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    charity_id?: number;
    charity_name: string;
    desc: string;
    getId(): any;
}
