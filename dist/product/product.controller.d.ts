import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UploadService } from '../upload/upload.service';
export declare class ProductController {
    private readonly productService;
    private readonly uploadService;
    constructor(productService: ProductService, uploadService: UploadService);
    findAll(queryDto: ProductQueryDto, allLanguages?: boolean, isActive?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: import("../_common/entities/product.entity").Product[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
        message: string;
    }>;
    findOne(id: number, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    create(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<import("../_common/entities/product.entity").Product>;
    update(id: number, updateProductDto: UpdateProductDto, file?: Express.Multer.File): Promise<import("../_common/entities/product.entity").Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
    incrementViews(id: number): Promise<{
        message: string;
        views: number;
    }>;
}
