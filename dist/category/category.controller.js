"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const category_query_dto_1 = require("./dto/category-query.dto");
const category_entity_1 = require("../_common/entities/category.entity");
const jwt_auth_guard_1 = require("../_common/guards/jwt-auth.guard");
const roles_guard_1 = require("../_common/guards/roles.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const menu_item_dto_1 = require("./dto/menu-item.dto");
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getMenu(acceptLanguage) {
        const menu = await this.categoryService.getMenu(acceptLanguage);
        return {
            success: true,
            data: menu,
            message: 'Menyu strukturu uğurla əldə edildi',
        };
    }
    async create(createCategoryDto) {
        const category = await this.categoryService.create(createCategoryDto);
        return {
            success: true,
            data: category,
            message: 'Kateqoriya uğurla yaradıldı',
        };
    }
    async findAll(queryDto, isActive, allLanguages, acceptLanguage) {
        if (isActive !== undefined) {
            queryDto.isActive = isActive;
        }
        if (allLanguages) {
            const result = await this.categoryService.findAllForAdmin(queryDto);
            return {
                success: true,
                data: result.data,
                pagination: result.pagination,
                message: 'Kateqoriyalar uğurla əldə edildi',
            };
        }
        const result = await this.categoryService.findAll(queryDto, acceptLanguage);
        return {
            success: true,
            data: result.data,
            pagination: result.pagination,
            message: 'Kateqoriyalar uğurla əldə edildi',
        };
    }
    async getAll(queryParams, acceptLanguage) {
        const { allLanguages, isActive } = queryParams;
        if (allLanguages) {
            const categories = await this.categoryService.getAllForAdmin(isActive);
            return {
                success: true,
                data: categories,
                message: 'Bütün kateqoriyalar uğurla əldə edildi',
            };
        }
        const categories = await this.categoryService.getAll(acceptLanguage, isActive);
        return {
            success: true,
            data: categories,
            message: 'Bütün kateqoriyalar uğurla əldə edildi',
        };
    }
    async getRootCategories(allLanguages, acceptLanguage) {
        if (allLanguages) {
            const categories = await this.categoryService.getRootCategoriesForAdmin();
            return {
                success: true,
                data: categories,
                message: 'Root kateqoriyalar uğurla əldə edildi',
            };
        }
        const categories = await this.categoryService.getRootCategories(acceptLanguage);
        return {
            success: true,
            data: categories,
            message: 'Root kateqoriyalar uğurla əldə edildi',
        };
    }
    async getCategoryTree(allLanguages, acceptLanguage) {
        if (allLanguages) {
            const tree = await this.categoryService.getCategoryTreeForAdmin();
            return {
                success: true,
                data: tree,
                message: 'Kateqoriya ağacı uğurla əldə edildi',
            };
        }
        const tree = await this.categoryService.getCategoryTree(acceptLanguage);
        return {
            success: true,
            data: tree,
            message: 'Kateqoriya ağacı uğurla əldə edildi',
        };
    }
    async getProductHolderCategories(allLanguages, acceptLanguage) {
        if (allLanguages) {
            const categories = await this.categoryService.getProductHolderCategoriesForAdmin();
            return {
                success: true,
                data: categories,
                message: 'Məhsul saxlayan kateqoriyalar uğurla əldə edildi',
            };
        }
        const categories = await this.categoryService.getProductHolderCategories(acceptLanguage);
        return {
            success: true,
            data: categories,
            message: 'Məhsul saxlayan kateqoriyalar uğurla əldə edildi',
        };
    }
    async findOne(id, allLanguages, acceptLanguage) {
        if (allLanguages) {
            const category = await this.categoryService.findOneForAdmin(id);
            return {
                success: true,
                data: category,
                message: 'Kateqoriya uğurla tapıldı',
            };
        }
        const category = await this.categoryService.findOne(id, acceptLanguage);
        return {
            success: true,
            data: category,
            message: 'Kateqoriya uğurla tapıldı',
        };
    }
    async update(id, updateCategoryDto) {
        const category = await this.categoryService.update(id, updateCategoryDto);
        return {
            success: true,
            data: category,
            message: 'Kateqoriya uğurla yeniləndi',
        };
    }
    async remove(id) {
        await this.categoryService.remove(id);
        return {
            success: true,
            message: 'Kateqoriya uğurla silindi',
        };
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)('menu'),
    (0, swagger_1.ApiOperation)({
        summary: 'Menyu strukturunu əldə etmək',
        description: 'Hierarchik menyu strukturunda aktiv kateqoriyaları qaytarır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Menyu strukturu uğurla qaytarıldı',
        type: [menu_item_dto_1.MenuItemDto],
    }),
    __param(0, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getMenu", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Yeni kateqoriya yaratmaq',
    }),
    (0, swagger_1.ApiBody)({ type: create_category_dto_1.CreateCategoryDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Kateqoriya uğurla yaradıldı',
        type: category_entity_1.Category,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Yanlış məlumatlar və ya business rule pozuntusu',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Parent kateqoriya tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Bütün kateqoriyaları əldə etmək',
        description: 'Filtrlər və paginasiya ilə kateqoriyaların siyahısını qaytarır',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'parentId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'level', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kateqoriyaların siyahısı uğurla qaytarıldı',
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: false,
        skipMissingProperties: true,
        forbidUnknownValues: false,
    }))),
    __param(1, (0, common_1.Query)('isActive')),
    __param(2, (0, common_1.Query)('allLanguages')),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_query_dto_1.CategoryQueryDto, Boolean, Boolean, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({
        summary: 'Bütün kateqoriyaları əldə etmək (filtrsiz)',
        description: 'Filtrsiz bütün kateqoriyaların siyahısını qaytarır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        required: false,
        type: Boolean,
        description: 'Aktiv status filtri',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bütün kateqoriyalar uğurla qaytarıldı',
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: false,
        skipMissingProperties: true,
        forbidUnknownValues: false,
    }))),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('root'),
    (0, swagger_1.ApiOperation)({
        summary: 'Root kateqoriyaları əldə etmək',
        description: 'Yalnız birinci səviyyədəki kateqoriyaları qaytarır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Root kateqoriyalar uğurla qaytarıldı',
    }),
    __param(0, (0, common_1.Query)('allLanguages')),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getRootCategories", null);
__decorate([
    (0, common_1.Get)('tree'),
    (0, swagger_1.ApiOperation)({
        summary: 'Kateqoriya ağacını əldə etmək',
        description: 'Hierarchik strukturda bütün kateqoriyaları qaytarır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kateqoriya ağacı uğurla qaytarıldı',
    }),
    __param(0, (0, common_1.Query)('allLanguages')),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryTree", null);
__decorate([
    (0, common_1.Get)('product-holders'),
    (0, swagger_1.ApiOperation)({
        summary: 'Məhsul saxlaya bilən kateqoriyaları əldə etmək',
        description: 'isProductHolder=true olan kateqoriyaları qaytarır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Məhsul saxlayan kateqoriyalar uğurla qaytarıldı',
    }),
    __param(0, (0, common_1.Query)('allLanguages')),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getProductHolderCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'ID-yə görə kateqoriya tapmaq',
        description: 'Müəyyən ID-li kateqoriyanı parent, children və products məlumatları ilə birlikdə qaytarır',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Kateqoriyanın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kateqoriya uğurla tapıldı',
        type: category_entity_1.Category,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Kateqoriya tapılmadı',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('allLanguages')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Kateqoriyanı yeniləmək',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Yenilənəcək kateqoriyanın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({ type: update_category_dto_1.UpdateCategoryDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kateqoriya uğurla yeniləndi',
        type: category_entity_1.Category,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Yanlış məlumatlar və ya business rule pozuntusu',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Kateqoriya və ya parent kateqoriya tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Kateqoriyanı silmək',
        description: 'Yalnız admin tərəfindən kateqoriya silinə bilər. Alt kateqoriyası olan kateqoriya silinə bilməz.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Silinəcək kateqoriyanın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kateqoriya uğurla silindi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Alt kateqoriyaları olan kateqoriya silinə bilməz',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Kateqoriya tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map