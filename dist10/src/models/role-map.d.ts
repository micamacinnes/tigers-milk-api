import { Entity } from '@loopback/repository';
export declare class RoleMap extends Entity {
    role_map_id?: number;
    user_id: number;
    role_id: number;
    getId(): any;
}
