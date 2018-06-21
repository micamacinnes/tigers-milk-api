import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    about: string;
    img: string;
    getId(): number | undefined;
}
