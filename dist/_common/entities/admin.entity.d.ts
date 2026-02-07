import { BaseEntity } from './_base/base.entity';
export declare class Admin extends BaseEntity {
    username: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    lastLogin: Date;
}
