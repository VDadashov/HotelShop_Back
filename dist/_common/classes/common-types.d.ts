export declare class MultiLanguageText {
    az: string;
    en: string;
    ru: string;
    constructor(partial?: Partial<MultiLanguageText>);
}
export declare class MediaFile {
    url: string;
    type: 'image' | 'video';
    size?: number;
    mimeType?: string;
    alt?: MultiLanguageText;
    constructor(partial?: Partial<MediaFile>);
}
export declare class AdditionalData {
    constructor(partial?: Partial<AdditionalData>);
}
