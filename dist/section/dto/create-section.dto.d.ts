import { MultiLanguageText, MediaFile, AdditionalData } from '../../_common/classes/common-types';
export declare class CreateSectionDto {
    name: string;
    type: 'hero' | 'content' | 'about' | 'services' | 'gallery' | 'contact' | 'footer' | 'navbar' | 'testimonial' | 'blog' | 'custom';
    title: MultiLanguageText;
    description: MultiLanguageText;
    pageId: number;
    order?: number;
    visibility?: 'desktop' | 'mobile' | 'both';
    isActive?: boolean;
    media?: MediaFile | null;
    additionalData?: AdditionalData | null;
}
