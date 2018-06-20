import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    user_id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    getId(): any;
}
