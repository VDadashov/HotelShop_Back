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
exports.CreatePromoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class MultilingualTextDto {
    az;
    en;
    ru;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Azərbaycan dilində mətn',
        example: 'Yay Promosiyası',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'İngilis dilində mətn',
        example: 'Summer Promotion',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rus dilində mətn',
        example: 'Летняя акция',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "ru", void 0);
class MultilingualTextOptionalDto {
    az;
    en;
    ru;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Azərbaycan dilində mətn',
        example: 'Böyük endirim!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultilingualTextOptionalDto.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'İngilis dilində mətn',
        example: 'Big discount!',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MultilingualTextOptionalDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rus dilində mətn',
        example: 'Большая скидка!',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MultilingualTextOptionalDto.prototype, "ru", void 0);
class CreatePromoDto {
    title;
    subtitle;
    description;
    startDate;
    endDate;
    productId;
    backgroundImg;
    isActive = true;
}
exports.CreatePromoDto = CreatePromoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Promo başlığı (çoxdilli)',
        type: MultilingualTextDto,
        example: {
            az: 'Yay Promosiyası',
            en: 'Summer Promotion',
            ru: 'Летняя акция'
        }
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultilingualTextDto),
    __metadata("design:type", MultilingualTextDto)
], CreatePromoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Promo alt başlığı (çoxdilli)',
        type: MultilingualTextOptionalDto,
        example: {
            az: 'Böyük endirim!',
            en: 'Big discount!',
            ru: 'Большая скидка!'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultilingualTextOptionalDto),
    __metadata("design:type", MultilingualTextOptionalDto)
], CreatePromoDto.prototype, "subtitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Promo təsviri (çoxdilli)',
        type: MultilingualTextOptionalDto,
        example: {
            az: 'Bu yay böyük endirimlər...',
            en: 'This summer great discounts...',
            ru: 'Этим летом большие скидки...'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultilingualTextOptionalDto),
    __metadata("design:type", MultilingualTextOptionalDto)
], CreatePromoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Promo başlama tarixi (ISO format)',
        example: '2024-06-01T00:00:00.000Z',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'Başlama tarixi düzgün format olmalıdır (ISO)' }),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Promo bitmə tarixi (ISO format)',
        example: '2024-08-31T23:59:59.000Z',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'Bitmə tarixi düzgün format olmalıdır (ISO)' }),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Məhsul ID-si',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Məhsul ID-si rəqəm olmalıdır' }),
    __metadata("design:type", Number)
], CreatePromoDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Promo arxa plan şəkli',
        example: '/uploads/promos/summer-promo.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "backgroundImg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Promo aktiv statusu',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'isActive boolean olmalıdır' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value === 'true';
        }
        return value;
    }),
    __metadata("design:type", Boolean)
], CreatePromoDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-promo.dto.js.map