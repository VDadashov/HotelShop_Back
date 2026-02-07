export declare class ProductQueryDto {
    page?: number;
    pageSize?: number;
    categoryId?: number;
    isActive?: boolean;
    searchQuery?: string;
    sort?: 'az' | 'za' | 'newest' | 'oldest' | 'most-viewed';
}
