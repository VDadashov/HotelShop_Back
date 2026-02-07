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
exports.BrandController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const brand_service_1 = require("./brand.service");
const create_brand_dto_1 = require("./dto/create-brand.dto");
const update_brand_dto_1 = require("./dto/update-brand.dto");
const brand_query_dto_1 = require("./dto/brand-query.dto");
const brand_entity_1 = require("../_common/entities/brand.entity");
const jwt_auth_guard_1 = require("../_common/guards/jwt-auth.guard");
const roles_guard_1 = require("../_common/guards/roles.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
let BrandController = class BrandController {
    brandService;
    constructor(brandService) {
        this.brandService = brandService;
    }
    async create(createBrandDto) {
        const brand = await this.brandService.create(createBrandDto);
        return {
            success: true,
            data: brand,
            message: 'Brand uğurla yaradıldı',
        };
    }
    async findAll(queryDto, isActive, allLanguages, acceptLanguage) {
        if (isActive !== undefined) {
            queryDto.isActive = isActive;
        }
        if (allLanguages) {
            const result = await this.brandService.findAllForAdmin(queryDto);
            return {
                success: true,
                data: result.data,
                pagination: {
                    total: result.total,
                    page: result.page,
                    limit: result.limit,
                    totalPages: Math.ceil(result.total / result.limit),
                },
                message: 'Brandlar uğurla əldə edildi',
            };
        }
        const result = await this.brandService.findAll(queryDto, acceptLanguage);
        return {
            success: true,
            data: result.data,
            pagination: {
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: Math.ceil(result.total / result.limit),
            },
            message: 'Brandlar uğurla əldə edildi',
        };
    }
    async getAll(queryParams, acceptLanguage) {
        const { allLanguages, isActive } = queryParams;
        if (allLanguages) {
            const brands = await this.brandService.getAllForAdmin(isActive);
            return {
                success: true,
                data: brands,
                message: 'Bütün brandlar uğurla əldə edildi',
            };
        }
        const brands = await this.brandService.getAll(acceptLanguage, isActive);
        return {
            success: true,
            data: brands,
            message: 'Bütün brandlar uğurla əldə edildi',
        };
    }
    async getActiveBrands(allLanguages, acceptLanguage) {
        if (allLanguages) {
            const brands = await this.brandService.getActiveBrandsForAdmin();
            return {
                success: true,
                data: brands,
                message: 'Aktiv brandlar uğurla əldə edildi',
            };
        }
        const brands = await this.brandService.getActiveBrands(acceptLanguage);
        return {
            success: true,
            data: brands,
            message: 'Aktiv brandlar uğurla əldə edildi',
        };
    }
    async searchByName(name, allLanguages, acceptLanguage) {
        if (allLanguages) {
            const brands = await this.brandService.searchByNameForAdmin(name);
            return {
                success: true,
                data: brands,
                message: 'Axtarış nəticələri uğurla əldə edildi',
            };
        }
        const brands = await this.brandService.searchByName(name, acceptLanguage);
        return {
            success: true,
            data: brands,
            message: 'Axtarış nəticələri uğurla əldə edildi',
        };
    }
    async getStats() {
        const stats = await this.brandService.getStats();
        return {
            success: true,
            data: stats,
            message: 'Statistikalar uğurla əldə edildi',
        };
    }
    async findOne(id, allLanguages, acceptLanguage) {
        if (allLanguages) {
            const brand = await this.brandService.findOneForAdmin(id);
            return {
                success: true,
                data: brand,
                message: 'Brand uğurla tapıldı',
            };
        }
        const brand = await this.brandService.findOne(id, acceptLanguage);
        return {
            success: true,
            data: brand,
            message: 'Brand uğurla tapıldı',
        };
    }
    async update(id, updateBrandDto) {
        const brand = await this.brandService.update(id, updateBrandDto);
        return {
            success: true,
            data: brand,
            message: 'Brand uğurla yeniləndi',
        };
    }
    async toggleStatus(id) {
        const brand = await this.brandService.toggleStatus(id);
        return {
            success: true,
            data: brand,
            message: `Brand ${brand.isActive ? 'aktivləşdirildi' : 'deaktivləşdirildi'}`,
        };
    }
    async remove(id) {
        await this.brandService.remove(id);
        return {
            success: true,
            message: 'Brand uğurla silindi',
        };
    }
};
exports.BrandController = BrandController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Yeni brand yaratmaq',
        description: 'Yalnız admin tərəfindən yeni brand yaradıla bilər',
    }),
    (0, swagger_1.ApiBody)({ type: create_brand_dto_1.CreateBrandDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Brand uğurla yaradıldı',
        type: brand_entity_1.Brand,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Eyni adda brand artıq mövcuddur və ya yanlış məlumatlar',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_dto_1.CreateBrandDto]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Bütün brandları əldə etmək',
        description: 'Filtrlər və paginasiya ilə brandların siyahısını qaytarır',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Brandların siyahısı uğurla qaytarıldı',
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
    __metadata("design:paramtypes", [brand_query_dto_1.BrandQueryDto, Boolean, Boolean, String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({
        summary: 'Bütün brandları əldə etmək (filtrsiz)',
        description: 'Filtrsiz bütün brandların siyahısını qaytarır',
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
        description: 'Bütün brandlar uğurla qaytarıldı',
        type: [brand_entity_1.Brand],
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
], BrandController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({
        summary: 'Aktiv brandları əldə etmək',
        description: 'Yalnız aktiv statusda olan brandları qaytarır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Aktiv brandlar uğurla qaytarıldı',
        type: [brand_entity_1.Brand],
    }),
    __param(0, (0, common_1.Query)('allLanguages')),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "getActiveBrands", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Brand adı ilə axtarış',
        description: 'Brand adında axtarış aparır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'name',
        required: true,
        type: String,
        description: 'Axtarış ediləcək brand adı',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Axtarış nəticələri uğurla qaytarıldı',
        type: [brand_entity_1.Brand],
    }),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('allLanguages')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "searchByName", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Brand statistikalarını əldə etmək',
        description: 'Ümumi, aktiv və passiv brandların sayını qaytarır',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Statistikalar uğurla qaytarıldı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'ID-yə görə brand tapmaq',
        description: 'Müəyyən ID-li brandı qaytarır',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Brandın ID-si',
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
        description: 'Brand uğurla tapıldı',
        type: brand_entity_1.Brand,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Brand tapılmadı',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('allLanguages')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Brandı yeniləmək',
        description: 'Mövcud brandın məlumatlarını yeniləyir',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Yenilənəcək brandın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({ type: update_brand_dto_1.UpdateBrandDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Brand uğurla yeniləndi',
        type: brand_entity_1.Brand,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Eyni adda brand artıq mövcuddur və ya yanlış məlumatlar',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Brand tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_brand_dto_1.UpdateBrandDto]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Brand statusunu dəyişmək',
        description: 'Brandın aktiv/passiv statusunu dəyişir',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Statusu dəyişəcək brandın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Brand statusu uğurla dəyişdirildi',
        type: brand_entity_1.Brand,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Brand tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Brandı silmək',
        description: 'Yalnız admin tərəfindən brand silinə bilər',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Silinəcək brandın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Brand uğurla silindi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bu brand ilə bağlı məhsullar mövcuddur',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Brand tapılmadı',
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
], BrandController.prototype, "remove", null);
exports.BrandController = BrandController = __decorate([
    (0, swagger_1.ApiTags)('Brands'),
    (0, common_1.Controller)('brands'),
    __metadata("design:paramtypes", [brand_service_1.BrandService])
], BrandController);
//# sourceMappingURL=brand.controller.js.map