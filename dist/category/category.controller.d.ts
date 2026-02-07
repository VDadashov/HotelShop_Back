import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { Category } from '../_common/entities/category.entity';
import { MenuItemDto } from './dto/menu-item.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getMenu(acceptLanguage?: string): Promise<{
        success: boolean;
        data: MenuItemDto[];
        message: string;
    }>;
    create(createCategoryDto: CreateCategoryDto): Promise<{
        success: boolean;
        data: Category;
        message: string;
    }>;
    findAll(queryDto: CategoryQueryDto, isActive?: boolean, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
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
    getRootCategories(allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    getCategoryTree(allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    getProductHolderCategories(allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    findOne(id: number, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        success: boolean;
        data: Category;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
