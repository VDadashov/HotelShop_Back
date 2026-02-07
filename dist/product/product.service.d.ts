import { Repository } from 'typeorm';
import { Product } from '../_common/entities/product.entity';
import { Category } from '../_common/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { I18nService } from '../i18n/i18n.service';
export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}
export declare class ProductService {
    private readonly productRepository;
    private readonly categoryRepository;
    private readonly i18n;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>, i18n: I18nService);
    findAll(query: ProductQueryDto, acceptLanguage?: string): Promise<PaginatedResult<Product>>;
    findAllForAdmin(query: ProductQueryDto): Promise<PaginatedResult<Product>>;
    findOne(id: number, acceptLanguage?: string): Promise<any>;
    findOneForAdmin(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
    incrementViews(id: number): Promise<{
        message: string;
        views: number;
    }>;
}
