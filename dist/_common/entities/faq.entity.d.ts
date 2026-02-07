import { BaseEntity } from './_base/base.entity';
export declare class Faq extends BaseEntity {
    question: {
        az: string;
        en?: string;
        ru?: string;
    };
    answer: {
        az: string;
        en?: string;
        ru?: string;
    };
    isActive: boolean;
}
