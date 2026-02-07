import { BaseEntity } from 'typeorm';
import { Page } from './page.entity';
import { MultiLanguageText, MediaFile, AdditionalData } from '../classes/common-types';
export declare class Section extends BaseEntity {
    id: number;
    name: string;
    title: MultiLanguageText;
    description: MultiLanguageText;
    media?: MediaFile | null;
    additionalData?: AdditionalData | null;
    order: number;
    type: 'hero' | 'content' | 'about' | 'services' | 'gallery' | 'contact' | 'footer' | 'navbar' | 'testimonial' | 'blog' | 'custom';
    pageId: number;
    isActive: boolean;
    visibility: 'desktop' | 'mobile' | 'both';
    createdAt: Date;
    updatedAt: Date;
    page: Page;
}
