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
exports.FaqController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const faq_service_1 = require("./faq.service");
const create_faq_dto_1 = require("./dto/create-faq.dto");
const update_faq_dto_1 = require("./dto/update-faq.dto");
const faq_query_dto_1 = require("./dto/faq-query.dto");
const faq_entity_1 = require("../_common/entities/faq.entity");
const jwt_auth_guard_1 = require("../_common/guards/jwt-auth.guard");
const roles_guard_1 = require("../_common/guards/roles.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
let FaqController = class FaqController {
    faqService;
    constructor(faqService) {
        this.faqService = faqService;
    }
    async findAll(queryDto, allLanguages, acceptLanguage, isActive) {
        if (allLanguages) {
            const result = await this.faqService.findAllForAdmin(queryDto);
            return {
                success: true,
                data: result.data,
                pagination: {
                    total: result.total,
                    page: result.page,
                    limit: result.limit,
                    totalPages: Math.ceil(result.total / result.limit),
                },
                message: 'FAQ-lar uğurla əldə edildi',
            };
        }
        const result = await this.faqService.findAll(queryDto, acceptLanguage, isActive);
        return {
            success: true,
            data: result.data,
            pagination: {
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: Math.ceil(result.total / result.limit),
            },
            message: 'FAQ-lar uğurla əldə edildi',
        };
    }
    async getAll(allLanguages, acceptLanguage) {
        if (allLanguages) {
            const faqs = await this.faqService.getAllForAdmin();
            return {
                success: true,
                data: faqs,
                message: 'Bütün FAQ-lar uğurla əldə edildi',
            };
        }
        const faqs = await this.faqService.getAll(acceptLanguage);
        return {
            success: true,
            data: faqs,
            message: 'Bütün FAQ-lar uğurla əldə edildi',
        };
    }
    async findOne(id, allLanguages, acceptLanguage) {
        if (allLanguages) {
            const faq = await this.faqService.findOneForAdmin(id);
            return {
                success: true,
                data: faq,
                message: 'FAQ uğurla tapıldı',
            };
        }
        const faq = await this.faqService.findOne(id, acceptLanguage);
        return {
            success: true,
            data: faq,
            message: 'FAQ uğurla tapıldı',
        };
    }
    async create(createFaqDto) {
        const faq = await this.faqService.create(createFaqDto);
        return {
            success: true,
            data: faq,
            message: 'FAQ uğurla yaradıldı',
        };
    }
    async update(id, updateFaqDto) {
        const faq = await this.faqService.update(id, updateFaqDto);
        return {
            success: true,
            data: faq,
            message: 'FAQ uğurla yeniləndi',
        };
    }
    async remove(id) {
        await this.faqService.remove(id);
        return {
            success: true,
            message: 'FAQ uğurla silindi',
        };
    }
};
exports.FaqController = FaqController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Bütün FAQ-ları əldə etmək',
        description: 'Filtrlər və paginasiya ilə FAQ-ların siyahısını qaytarır',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        required: false,
        type: Boolean,
        description: 'Aktiv FAQ-ları filterlə',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Sual və ya cavabda axtarış (bütün dillərdə)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər (əks halda Accept-Language header istifadə edilir)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'FAQ-ların siyahısı uğurla qaytarıldı',
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        skipMissingProperties: true,
        forbidUnknownValues: false,
    }))),
    __param(1, (0, common_1.Query)('allLanguages')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __param(3, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [faq_query_dto_1.FaqQueryDto, Boolean, String, Boolean]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({
        summary: 'Bütün FAQ-ları əldə etmək (filtrsiz)',
        description: 'Filtrsiz bütün FAQ-ların siyahısını qaytarır',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər (əks halda Accept-Language header istifadə edilir)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bütün FAQ-lar uğurla qaytarıldı',
    }),
    __param(0, (0, common_1.Query)('allLanguages')),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'ID-yə görə FAQ tapmaq',
        description: 'Müəyyən ID-li FAQ-ı qaytarır',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'FAQ-ın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər (əks halda Accept-Language header istifadə edilir)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'FAQ uğurla tapıldı',
        type: faq_entity_1.Faq,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'FAQ tapılmadı',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('allLanguages')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Yeni FAQ yaratmaq' }),
    (0, swagger_1.ApiBody)({ type: create_faq_dto_1.CreateFaqDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'FAQ uğurla yaradıldı',
        type: faq_entity_1.Faq,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Yanlış məlumatlar və ya validation xətası',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_faq_dto_1.CreateFaqDto]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'FAQ-ı yeniləmək' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Yenilənəcək FAQ-ın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({ type: update_faq_dto_1.UpdateFaqDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'FAQ uğurla yeniləndi',
        type: faq_entity_1.Faq,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Yanlış məlumatlar və ya validation xətası',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'FAQ tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'İcazə yoxdur',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_faq_dto_1.UpdateFaqDto]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'FAQ-ı silmək',
        description: 'Yalnız admin tərəfindən FAQ silinə bilər',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Silinəcək FAQ-ın ID-si',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'FAQ uğurla silindi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'FAQ tapılmadı',
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
], FaqController.prototype, "remove", null);
exports.FaqController = FaqController = __decorate([
    (0, swagger_1.ApiTags)('FAQs'),
    (0, common_1.Controller)('faqs'),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], FaqController);
//# sourceMappingURL=faq.controller.js.map