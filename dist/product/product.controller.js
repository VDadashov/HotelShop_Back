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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const product_query_dto_1 = require("./dto/product-query.dto");
const jwt_auth_guard_1 = require("../_common/guards/jwt-auth.guard");
const roles_guard_1 = require("../_common/guards/roles.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const upload_service_1 = require("../upload/upload.service");
let ProductController = class ProductController {
    productService;
    uploadService;
    constructor(productService, uploadService) {
        this.productService = productService;
        this.uploadService = uploadService;
    }
    async findAll(queryDto, allLanguages, isActive, acceptLanguage) {
        if (isActive !== undefined) {
            queryDto.isActive = isActive;
        }
        if (allLanguages) {
            const result = await this.productService.findAllForAdmin(queryDto);
            return {
                success: true,
                data: result.data,
                pagination: {
                    totalItems: result.pagination.totalItems,
                    totalPages: result.pagination.totalPages,
                    currentPage: result.pagination.currentPage,
                    pageSize: result.pagination.pageSize,
                },
                message: 'Məhsullar uğurla əldə edildi',
            };
        }
        const result = await this.productService.findAll(queryDto, acceptLanguage);
        return {
            success: true,
            data: result.data,
            pagination: {
                totalItems: result.pagination.totalItems,
                totalPages: result.pagination.totalPages,
                currentPage: result.pagination.currentPage,
                pageSize: result.pagination.pageSize,
            },
            message: 'Məhsullar uğurla əldə edildi',
        };
    }
    async findOne(id, allLanguages, acceptLanguage) {
        if (allLanguages) {
            const product = await this.productService.findOneForAdmin(id);
            return {
                success: true,
                data: product,
                message: 'Məhsul uğurla tapıldı',
            };
        }
        const product = await this.productService.findOne(id, acceptLanguage);
        return {
            success: true,
            data: product,
            message: 'Məhsul uğurla tapıldı',
        };
    }
    async create(createProductDto, file) {
        if (file) {
            const uploadResult = await this.uploadService.saveFile(file, 'images');
            createProductDto.mainImg = uploadResult.media.url;
        }
        return await this.productService.create(createProductDto);
    }
    async update(id, updateProductDto, file) {
        if (file) {
            const uploadResult = await this.uploadService.saveFile(file, 'images');
            updateProductDto.mainImg = uploadResult.media.url;
        }
        return await this.productService.update(id, updateProductDto);
    }
    async remove(id) {
        return await this.productService.remove(id);
    }
    async incrementViews(id) {
        return await this.productService.incrementViews(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bütün məhsulları gətir (səhifələmə, axtarış, filter ilə)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Səhifələnmiş məhsul siyahısı',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Səhifə nömrəsi',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'pageSize',
        required: false,
        type: Number,
        description: 'Hər səhifədə məhsul sayı',
        example: 10,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'categoryId',
        required: false,
        type: Number,
        description: 'Kateqoriya ID-si ilə filterlə',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        required: false,
        type: Boolean,
        description: 'Aktiv məhsulları filterlə',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'searchQuery',
        required: false,
        type: String,
        description: 'Məhsul adı və ya təsvirində axtarış',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sort',
        required: false,
        enum: ['az', 'za', 'newest', 'oldest', 'most-viewed'],
        description: 'Sıralama növü',
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: false,
        skipMissingProperties: true,
        forbidUnknownValues: false,
    }))),
    __param(1, (0, common_1.Query)('allLanguages')),
    __param(2, (0, common_1.Query)('isActive')),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_query_dto_1.ProductQueryDto, Boolean, Boolean, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ID ilə məhsul gətir' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Məhsul ID-si',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Məhsul obyekti',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Məhsul tapılmadı',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('allLanguages')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('mainImg')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Yeni məhsul yarat' }),
    (0, swagger_1.ApiBody)({
        description: 'Məhsul məlumatları',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'object',
                    properties: {
                        az: { type: 'string', example: 'Samsung Galaxy S21' },
                        en: { type: 'string', example: 'Samsung Galaxy S21' },
                        ru: { type: 'string', example: 'Самсунг Галакси S21' },
                    },
                },
                description: {
                    type: 'object',
                    properties: {
                        az: { type: 'string', example: 'Məhsul haqqında ətraflı məlumat...' },
                        en: { type: 'string', example: 'Detailed product information...' },
                        ru: { type: 'string', example: 'Подробная информация о продукте...' },
                    },
                },
                categoryId: { type: 'number', example: 1 },
                isActive: { type: 'boolean', example: true },
                mainImg: {
                    type: 'string',
                    format: 'binary',
                    description: 'Məhsul şəkli',
                },
            },
            required: ['name', 'categoryId'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Məhsul uğurla yaradıldı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Validasiya xətası',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Qeyri-təsdiq edilmiş istifadəçi',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('mainImg')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Məhsulu yenilə' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Məhsul ID-si',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Yenilənəcək məhsul məlumatları',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'object',
                    properties: {
                        az: { type: 'string' },
                        en: { type: 'string' },
                        ru: { type: 'string' },
                    },
                },
                description: {
                    type: 'object',
                    properties: {
                        az: { type: 'string' },
                        en: { type: 'string' },
                        ru: { type: 'string' },
                    },
                },
                categoryId: { type: 'number' },
                isActive: { type: 'boolean' },
                mainImg: {
                    type: 'string',
                    format: 'binary',
                    description: 'Yeni məhsul şəkli',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Məhsul uğurla yeniləndi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Məhsul tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Qeyri-təsdiq edilmiş istifadəçi',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Məhsulu sil' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Məhsul ID-si',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Məhsul uğurla silindi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Məhsul tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Qeyri-təsdiq edilmiş istifadəçi',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/views'),
    (0, swagger_1.ApiOperation)({ summary: 'Məhsul baxış sayını artır' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Məhsul ID-si',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Baxış sayı artırıldı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Məhsul tapılmadı',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "incrementViews", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        upload_service_1.UploadService])
], ProductController);
//# sourceMappingURL=product.controller.js.map