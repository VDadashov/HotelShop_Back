import { Product } from './product.entity';
import { BaseEntity } from './_base/base.entity';
export declare class Promo extends BaseEntity {
    title: {
        az: string;
        en?: string;
        ru?: string;
    };
    subtitle: {
        az: string;
        en?: string;
        ru?: string;
    };
    description: {
        az: string;
        en?: string;
        ru?: string;
    };
    startDate: Date;
    endDate: Date;
    backgroundImg: string | null;
    product: Product;
    isActive: boolean;
}
