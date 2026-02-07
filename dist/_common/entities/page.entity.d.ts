import { BaseEntity } from 'typeorm';
import { Section } from './section.entity';
export interface MultiLanguageText {
    az: string;
    en?: string;
    ru?: string;
}
export declare class Page extends BaseEntity {
    id: number;
    title: MultiLanguageText;
    slug: string;
    isActive: boolean;
    sections: Section[];
}
