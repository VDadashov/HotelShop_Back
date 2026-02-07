declare class MultilingualTextDto {
    az: string;
    en?: string;
    ru?: string;
}
declare class MessageMultilingualTextDto {
    az: string;
    en?: string;
    ru?: string;
}
export declare class CreateTestimonialDto {
    name: MultilingualTextDto;
    message: MessageMultilingualTextDto;
    imageUrl?: string;
    isActive?: boolean;
    rating?: number;
}
export {};
