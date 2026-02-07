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
exports.CreateProductDto = void 0;
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
        example: 'Samsung Galaxy S21',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'İngilis dilində mətn',
        example: 'Samsung Galaxy S21',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rus dilində mətn',
        example: 'Самсунг Галакси S21',
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
        example: 'Bu məhsul haqqında ətraflı məlumat...',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultilingualTextOptionalDto.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'İngilis dilində mətn',
        example: 'Detailed information about this product...',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MultilingualTextOptionalDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rus dilində mətn',
        example: 'Подробная информация об этом продукте...',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MultilingualTextOptionalDto.prototype, "ru", void 0);
class CreateProductDto {
    name;
    description;
    categoryId;
    mainImg;
    isActive = true;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Məhsul adı (çoxdilli)',
        type: MultilingualTextDto,
        example: {
            az: 'Samsung Galaxy S21',
            en: 'Samsung Galaxy S21',
            ru: 'Самсунг Галакси S21'
        }
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultilingualTextDto),
    __metadata("design:type", MultilingualTextDto)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Məhsul təsviri (çoxdilli)',
        type: MultilingualTextOptionalDto,
        example: {
            az: 'Bu məhsul haqqında ətraflı məlumat...',
            en: 'Detailed information about this product...',
            ru: 'Подробная информация об этом продукте...'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultilingualTextOptionalDto),
    __metadata("design:type", MultilingualTextOptionalDto)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Kateqoriya ID-si',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Kateqoriya ID-si rəqəm olmalıdır' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Məhsulun əsas şəkli',
        example: '/uploads/products/samsung-s21.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "mainImg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Məhsulun aktiv statusu',
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
], CreateProductDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-product.dto.js.map