declare class BrandNameDto {
    az: string;
    en?: string;
    ru?: string;
}
export declare class CreateBrandDto {
    name: BrandNameDto;
    imageUrl?: string;
    isActive?: boolean;
}
export {};
