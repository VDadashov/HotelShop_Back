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
exports.PromoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const promo_service_1 = require("./promo.service");
const create_promo_dto_1 = require("./dto/create-promo.dto");
const update_promo_dto_1 = require("./dto/update-promo.dto");
const promo_query_dto_1 = require("./dto/promo-query.dto");
const jwt_auth_guard_1 = require("../_common/guards/jwt-auth.guard");
const roles_guard_1 = require("../_common/guards/roles.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
let PromoController = class PromoController {
    promoService;
    constructor(promoService) {
        this.promoService = promoService;
    }
    async findAll(query, isActive) {
        if (isActive !== undefined) {
            query.isActive = isActive;
        }
        return await this.promoService.findAll(query);
    }
    async getCurrentPromos() {
        return await this.promoService.getCurrentPromos();
    }
    async findOne(id) {
        return await this.promoService.findOne(id);
    }
    async create(createPromoDto) {
        return await this.promoService.create(createPromoDto);
    }
    async update(id, updatePromoDto) {
        return await this.promoService.update(id, updatePromoDto);
    }
    async remove(id) {
        return await this.promoService.remove(id);
    }
};
exports.PromoController = PromoController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bütün promoları gətir (axtarış və filter ilə)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Promo siyahısı',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        required: false,
        type: Boolean,
        description: 'Aktiv promoları filterlə',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'productId',
        required: false,
        type: Number,
        description: 'Məhsul ID-si ilə filterlə',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Promo başlıq və ya təsvirində axtarış',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'current',
        required: false,
        type: Boolean,
        description: 'Hazırda aktiv olan promoları filterlə',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'startDateFrom',
        required: false,
        type: String,
        description: 'Müəyyən tarixdən sonrakı promoları filterlə',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'startDateTo',
        required: false,
        type: String,
        description: 'Müəyyən tarixə qədər başlayan promoları filterlə',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sort',
        required: false,
        enum: ['newest', 'oldest', 'start-date-asc', 'start-date-desc', 'end-date-asc', 'end-date-desc', 'title-az', 'title-za'],
        description: 'Sıralama növü',
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: false,
        skipMissingProperties: true,
        forbidUnknownValues: false,
    }))),
    __param(1, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [promo_query_dto_1.PromoQueryDto, Boolean]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('current'),
    (0, swagger_1.ApiOperation)({ summary: 'Hazırda aktiv olan promoları gətir' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Hazırda aktiv promo siyahısı',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "getCurrentPromos", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ID ilə promo gətir' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Promo ID-si',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Promo obyekti',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Promo tapılmadı',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Yeni promo yarat' }),
    (0, swagger_1.ApiBody)({ type: create_promo_dto_1.CreatePromoDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Promo uğurla yaradıldı',
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promo_dto_1.CreatePromoDto]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Promo yenilə' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Promo ID-si',
    }),
    (0, swagger_1.ApiBody)({ type: update_promo_dto_1.UpdatePromoDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Promo uğurla yeniləndi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Promo tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Qeyri-təsdiq edilmiş istifadəçi',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_promo_dto_1.UpdatePromoDto]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Promo sil' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Promo ID-si',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Promo uğurla silindi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Promo tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Qeyri-təsdiq edilmiş istifadəçi',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "remove", null);
exports.PromoController = PromoController = __decorate([
    (0, swagger_1.ApiTags)('Promos'),
    (0, common_1.Controller)('promos'),
    __metadata("design:paramtypes", [promo_service_1.PromoService])
], PromoController);
//# sourceMappingURL=promo.controller.js.map