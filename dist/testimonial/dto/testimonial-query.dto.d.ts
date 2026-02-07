export declare class TestimonialQueryDto {
    isActive?: boolean;
    search?: string;
    minRating?: number;
    sort?: 'newest' | 'oldest' | 'name-az' | 'name-za' | 'rating-high' | 'rating-low';
    page?: number;
    pageSize?: number;
}
