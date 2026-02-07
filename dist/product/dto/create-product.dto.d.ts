declare class MultilingualTextDto {
    az: string;
    en: string;
    ru: string;
}
declare class MultilingualTextOptionalDto {
    az: string;
    en?: string;
    ru?: string;
}
export declare class CreateProductDto {
    name: MultilingualTextDto;
    description?: MultilingualTextOptionalDto;
    categoryId: number;
    mainImg?: string;
    isActive?: boolean;
}
export {};
