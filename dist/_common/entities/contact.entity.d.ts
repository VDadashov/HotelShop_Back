import { BaseEntity } from './_base/base.entity';
export declare class Contact extends BaseEntity {
    name: string;
    email: string;
    message: string;
    isRead: boolean;
}
