import { UploadService } from './upload.service';
import { DeleteFileDto } from './dto/delete-file.dto';
import { UploadQueryDto } from './dto/upload-query.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    getAllFiles(queryDto: UploadQueryDto): Promise<{
        success: boolean;
        data: any;
        pagination: {
            totalItems: any;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
        message: string;
    }>;
    uploadImage(file: Express.Multer.File): Promise<import("./upload.service").UploadResult>;
    uploadPdf(file: Express.Multer.File): Promise<import("./upload.service").UploadResult>;
    uploadVideo(file: Express.Multer.File): Promise<import("./upload.service").UploadResult>;
    deleteFile(deleteFileDto: DeleteFileDto): Promise<{
        success: boolean;
        message: string;
        result: any;
    }>;
}
