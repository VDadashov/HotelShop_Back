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
exports.TestimonialController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const testimonial_service_1 = require("./testimonial.service");
const create_testimonial_dto_1 = require("./dto/create-testimonial.dto");
const update_testimonial_dto_1 = require("./dto/update-testimonial.dto");
const testimonial_query_dto_1 = require("./dto/testimonial-query.dto");
const testimonial_entity_1 = require("../_common/entities/testimonial.entity");
const jwt_auth_guard_1 = require("../_common/guards/jwt-auth.guard");
const roles_guard_1 = require("../_common/guards/roles.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const upload_service_1 = require("../upload/upload.service");
let TestimonialController = class TestimonialController {
    testimonialService;
    uploadService;
    constructor(testimonialService, uploadService) {
        this.testimonialService = testimonialService;
        this.uploadService = uploadService;
    }
    async create(createTestimonialDto, file) {
        if (file) {
            const uploadResult = await this.uploadService.saveFile(file, 'images');
            createTestimonialDto.imageUrl = uploadResult.media.url;
        }
        const testimonial = await this.testimonialService.create(createTestimonialDto);
        return {
            success: true,
            data: testimonial,
            message: 'Testimonial uğurla yaradıldı',
        };
    }
    async findAll(queryDto, isActive, allLanguages, acceptLanguage) {
        if (isActive !== undefined) {
            queryDto.isActive = isActive;
        }
        if (allLanguages) {
            const result = await this.testimonialService.findAllForAdmin(queryDto);
            return {
                success: true,
                data: result.data,
                pagination: result.pagination,
                message: 'Testimoniallar uğurla əldə edildi',
            };
        }
        const result = await this.testimonialService.findAll(queryDto, acceptLanguage);
        return {
            success: true,
            data: result.data,
            pagination: result.pagination,
            message: 'Testimoniallar uğurla əldə edildi',
        };
    }
    async getAll(allLanguages, acceptLanguage) {
        if (allLanguages) {
            const testimonials = await this.testimonialService.getAllForAdmin();
            return {
                success: true,
                data: testimonials,
                message: 'Bütün testimoniallar uğurla əldə edildi',
            };
        }
        const testimonials = await this.testimonialService.getAll(acceptLanguage);
        return {
            success: true,
            data: testimonials,
            message: 'Bütün testimoniallar uğurla əldə edildi',
        };
    }
    async getActiveTestimonials(allLanguages, acceptLanguage) {
        if (allLanguages) {
            const testimonials = await this.testimonialService.getActiveTestimonialsForAdmin();
            return {
                success: true,
                data: testimonials,
                message: 'Aktiv testimoniallar uğurla əldə edildi',
            };
        }
        const testimonials = await this.testimonialService.getActiveTestimonials(acceptLanguage);
        return {
            success: true,
            data: testimonials,
            message: 'Aktiv testimoniallar uğurla əldə edildi',
        };
    }
    async findOne(id, allLanguages, acceptLanguage) {
        if (allLanguages) {
            const testimonial = await this.testimonialService.findOneForAdmin(id);
            return {
                success: true,
                data: testimonial,
                message: 'Testimonial uğurla tapıldı',
            };
        }
        const testimonial = await this.testimonialService.findOne(id, acceptLanguage);
        return {
            success: true,
            data: testimonial,
            message: 'Testimonial uğurla tapıldı',
        };
    }
    async update(id, updateTestimonialDto) {
        const testimonial = await this.testimonialService.update(id, updateTestimonialDto);
        return {
            success: true,
            data: testimonial,
            message: 'Testimonial uğurla yeniləndi',
        };
    }
    async remove(id) {
        await this.testimonialService.remove(id);
        return {
            success: true,
            message: 'Testimonial uğurla silindi',
        };
    }
};
exports.TestimonialController = TestimonialController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Yeni testimonial yaratmaq',
    }),
    (0, swagger_1.ApiBody)({ type: create_testimonial_dto_1.CreateTestimonialDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Testimonial uğurla yaradıldı',
        type: testimonial_entity_1.Testimonial,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Yanlış məlumatlar və ya validasiya xətası',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_testimonial_dto_1.CreateTestimonialDto, Object]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Bütün testimonialları əldə etmək',
        description: 'Filtrlər və sıralama ilə testimonialların siyahısını qaytarır',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Müştəri adı və ya rəyində axtarış',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minRating',
        required: false,
        type: Number,
        description: 'Minimum reytinq (1-5)',
        example: 4,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sort',
        required: false,
        enum: ['newest', 'oldest', 'name-az', 'name-za', 'rating-high', 'rating-low'],
        description: 'Sıralama növü',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonialların siyahısı uğurla qaytarıldı',
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
    __metadata("design:paramtypes", [testimonial_query_dto_1.TestimonialQueryDto, Boolean, Boolean, String]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({
        summary: 'Bütün testimonialları əldə etmək (filtrsiz)',
        description: 'Filtrsiz bütün testimonialların siyahısını qaytarır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bütün testimoniallar uğurla qaytarıldı',
    }),
    __param(0, (0, common_1.Query)('allLanguages')),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({
        summary: 'Aktiv testimonialları əldə etmək',
        description: 'Yalnız aktiv testimonialları qaytarır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Aktiv testimoniallar uğurla qaytarıldı',
    }),
    __param(0, (0, common_1.Query)('allLanguages')),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "getActiveTestimonials", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'ID-yə görə testimonial tapmaq',
        description: 'Müəyyən ID-li testimonialı qaytarır',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Testimonialın ID-si',
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
        description: 'Testimonial uğurla tapıldı',
        type: testimonial_entity_1.Testimonial,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Testimonial tapılmadı',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('allLanguages')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Testimonialı yeniləmək',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Yenilənəcək testimonialın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({ type: update_testimonial_dto_1.UpdateTestimonialDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonial uğurla yeniləndi',
        type: testimonial_entity_1.Testimonial,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Yanlış məlumatlar və ya validasiya xətası',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Testimonial tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_testimonial_dto_1.UpdateTestimonialDto]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Testimonialı silmək',
        description: 'Yalnız admin tərəfindən testimonial silinə bilər.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Silinəcək testimonialın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonial uğurla silindi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Testimonial tapılmadı',
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
], TestimonialController.prototype, "remove", null);
exports.TestimonialController = TestimonialController = __decorate([
    (0, swagger_1.ApiTags)('Testimonials'),
    (0, common_1.Controller)('testimonials'),
    __metadata("design:paramtypes", [testimonial_service_1.TestimonialService,
        upload_service_1.UploadService])
], TestimonialController);
//# sourceMappingURL=testimonial.controller.js.map