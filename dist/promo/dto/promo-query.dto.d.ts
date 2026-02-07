export declare class PromoQueryDto {
    isActive?: boolean;
    productId?: number;
    search?: string;
    current?: boolean;
    startDateFrom?: string;
    startDateTo?: string;
    sort?: 'newest' | 'oldest' | 'start-date-asc' | 'start-date-desc' | 'end-date-asc' | 'end-date-desc' | 'title-az' | 'title-za';
}
