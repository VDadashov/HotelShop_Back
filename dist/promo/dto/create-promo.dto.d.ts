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
export declare class CreatePromoDto {
    title: MultilingualTextDto;
    subtitle?: MultilingualTextOptionalDto;
    description?: MultilingualTextOptionalDto;
    startDate: string;
    endDate: string;
    productId: number;
    backgroundImg?: string;
    isActive?: boolean;
}
export {};
