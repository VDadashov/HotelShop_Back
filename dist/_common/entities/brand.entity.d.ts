import { BaseEntity } from 'typeorm';
export declare class Brand extends BaseEntity {
    id: number;
    name: {
        az: string;
        en?: string;
        ru?: string;
    };
    imageUrl: string;
    isActive: boolean;
}
