import { Repository } from 'typeorm';
import { Brand } from '../_common/entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandQueryDto } from './dto/brand-query.dto';
import { I18nService } from '../i18n/i18n.service';
export declare class BrandService {
    private readonly brandRepository;
    private readonly i18n;
    constructor(brandRepository: Repository<Brand>, i18n: I18nService);
    create(createBrandDto: CreateBrandDto): Promise<Brand>;
    getAll(lang?: string, isActive?: boolean): Promise<any[]>;
    getAllForAdmin(isActive?: boolean): Promise<Brand[]>;
    findAll(queryDto?: BrandQueryDto, lang?: string): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllForAdmin(queryDto?: BrandQueryDto): Promise<{
        data: Brand[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number, lang?: string): Promise<any>;
    findOneForAdmin(id: number): Promise<Brand>;
    update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand>;
    remove(id: number): Promise<void>;
    getActiveBrands(lang?: string): Promise<any[]>;
    getActiveBrandsForAdmin(): Promise<Brand[]>;
    toggleStatus(id: number): Promise<Brand>;
    searchByName(name: string, lang?: string): Promise<any[]>;
    searchByNameForAdmin(name: string): Promise<Brand[]>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
    }>;
}
