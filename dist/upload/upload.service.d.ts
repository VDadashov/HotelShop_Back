import { ConfigService } from '@nestjs/config';
export interface UploadResult {
    media: {
        alt: {
            az: string;
            en: string;
            ru: string;
        };
        url: string;
        publicId: string;
        size: number;
        type: 'image' | 'video' | 'file';
        mimeType: string;
    };
}
export declare class UploadService {
    private configService;
    private cloudinaryInstance;
    constructor(configService: ConfigService);
    saveFile(file: Express.Multer.File, folder: 'images' | 'pdfs' | 'videos'): Promise<UploadResult>;
    deleteFile(publicId: string, resourceType?: 'image' | 'video' | 'raw'): Promise<any>;
    getAllFiles(query: {
        page?: number;
        pageSize?: number;
        folder?: 'images' | 'pdfs' | 'videos';
        resourceType?: 'image' | 'video' | 'raw';
    }): Promise<{
        data: any;
        pagination: {
            totalItems: any;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
    }>;
}
