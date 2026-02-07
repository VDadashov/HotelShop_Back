import { Repository } from 'typeorm';
import { Category } from '../_common/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { I18nService } from '../i18n/i18n.service';
import { MenuItemDto } from './dto/menu-item.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    private readonly i18n;
    constructor(categoryRepository: Repository<Category>, i18n: I18nService);
    private buildMenuTree;
    private getLanguageFromHeader;
    getMenu(acceptLanguage?: string): Promise<MenuItemDto[]>;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    getAll(lang?: string, isActive?: boolean): Promise<any[]>;
    getAllForAdmin(isActive?: boolean): Promise<Category[]>;
    findAll(queryDto?: CategoryQueryDto, lang?: string): Promise<{
        data: any[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
    }>;
    findAllForAdmin(queryDto?: CategoryQueryDto): Promise<{
        data: Category[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
    }>;
    findOne(id: number, lang?: string): Promise<any>;
    findOneForAdmin(id: number): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: number): Promise<void>;
    getRootCategories(lang?: string): Promise<any[]>;
    getRootCategoriesForAdmin(): Promise<Category[]>;
    getCategoryTree(lang?: string): Promise<any[]>;
    getCategoryTreeForAdmin(): Promise<Category[]>;
    getProductHolderCategories(lang?: string): Promise<any[]>;
    getProductHolderCategoriesForAdmin(): Promise<Category[]>;
    private isChildOfCategory;
    private updateChildrenLevels;
    private buildTree;
}
