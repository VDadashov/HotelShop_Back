import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandQueryDto } from './dto/brand-query.dto';
import { Brand } from '../_common/entities/brand.entity';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    create(createBrandDto: CreateBrandDto): Promise<{
        success: boolean;
        data: Brand;
        message: string;
    }>;
    findAll(queryDto: BrandQueryDto, isActive?: boolean, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        message: string;
    }>;
    getAll(queryParams: {
        allLanguages?: boolean;
        isActive?: boolean;
    }, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    getActiveBrands(allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    searchByName(name: string, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    getStats(): Promise<{
        success: boolean;
        data: {
            total: number;
            active: number;
            inactive: number;
        };
        message: string;
    }>;
    findOne(id: number, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    update(id: number, updateBrandDto: UpdateBrandDto): Promise<{
        success: boolean;
        data: Brand;
        message: string;
    }>;
    toggleStatus(id: number): Promise<{
        success: boolean;
        data: Brand;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
