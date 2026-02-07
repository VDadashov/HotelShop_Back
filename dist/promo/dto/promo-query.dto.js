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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PromoQueryDto {
    isActive;
    productId;
    search;
    current;
    startDateFrom;
    startDateTo;
    sort;
}
exports.PromoQueryDto = PromoQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Aktiv promoları filterlə',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true' || value === true)
            return true;
        if (value === 'false' || value === false)
            return false;
        return undefined;
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PromoQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Məhsul ID-si ilə filterlə',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Məhsul ID-si rəqəm olmalıdır' }),
    __metadata("design:type", Number)
], PromoQueryDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Promo başlıq və ya təsvirində axtarış (bütün dillərdə)',
        example: 'yay',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromoQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hazırda aktiv olan promoları filterlə',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true' || value === true)
            return true;
        if (value === 'false' || value === false)
            return false;
        return undefined;
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PromoQueryDto.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Müəyyən tarixdən sonrakı promoları filterlə',
        example: '2024-06-01T00:00:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PromoQueryDto.prototype, "startDateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Müəyyən tarixə qədər başlayan promoları filterlə',
        example: '2024-12-31T23:59:59.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PromoQueryDto.prototype, "startDateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sıralama növü',
        example: 'newest',
        enum: ['newest', 'oldest', 'start-date-asc', 'start-date-desc', 'end-date-asc', 'end-date-desc', 'title-az', 'title-za'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['newest', 'oldest', 'start-date-asc', 'start-date-desc', 'end-date-asc', 'end-date-desc', 'title-az', 'title-za']),
    __metadata("design:type", String)
], PromoQueryDto.prototype, "sort", void 0);
//# sourceMappingURL=promo-query.dto.js.map