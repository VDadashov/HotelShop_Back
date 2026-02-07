export declare class MultilingualTextDto {
    az: string;
    en?: string;
    ru?: string;
}
export declare class CreateCategoryDto {
    name: MultilingualTextDto;
    index?: number;
    isActive?: boolean;
    isProductHolder?: boolean;
    parentId?: number;
}
