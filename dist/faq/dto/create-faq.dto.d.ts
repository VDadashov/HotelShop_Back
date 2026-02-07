declare class MultilingualTextDto {
    az: string;
    en: string;
    ru: string;
}
export declare class CreateFaqDto {
    question: MultilingualTextDto;
    answer: MultilingualTextDto;
    isActive?: boolean;
}
export {};
