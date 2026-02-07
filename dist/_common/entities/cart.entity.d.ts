import { BaseEntity } from './_base/base.entity';
export interface CartItem {
    id: number;
    quantity: number;
}
export declare class Cart extends BaseEntity {
    token: string;
    items: CartItem[];
    isConfirmed: boolean;
    expiresAt: Date | null;
}
