export declare class UploadQueryDto {
    page?: number;
    pageSize?: number;
    resourceType?: 'image' | 'video' | 'raw';
    folder?: 'images' | 'pdfs' | 'videos';
}
