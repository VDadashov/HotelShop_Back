import { Product } from './product.entity';
import { BaseEntity } from './_base/base.entity';
export declare class Category extends BaseEntity {
    name: {
        az: string;
        en?: string;
        ru?: string;
    };
    index: number;
    isActive: boolean;
    isProductHolder: boolean;
    parentId: number | null;
    level: number;
    parent: Category | null;
    children: Category[];
    products: Product[];
}
