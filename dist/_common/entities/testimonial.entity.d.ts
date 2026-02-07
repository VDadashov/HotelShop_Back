import { BaseEntity } from './_base/base.entity';
export declare class Testimonial extends BaseEntity {
    name: {
        az: string;
        en?: string;
        ru?: string;
    };
    message: {
        az: string;
        en?: string;
        ru?: string;
    };
    imageUrl: string | null;
    isActive: boolean;
    rating: number;
}
