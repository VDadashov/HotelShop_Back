import { BaseEntity } from './_base/base.entity';
import { Category } from './category.entity';
export declare class Product extends BaseEntity {
    name: {
        az: string;
        en?: string;
        ru?: string;
    };
    description: {
        az: string;
        en?: string;
        ru?: string;
    };
    views: number;
    mainImg: string;
    category: Category;
    isActive: boolean;
}
