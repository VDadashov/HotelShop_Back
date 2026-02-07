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
exports.ProductQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ProductQueryDto {
    page = 1;
    pageSize = 10;
    categoryId;
    isActive;
    searchQuery;
    sort;
}
exports.ProductQueryDto = ProductQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Səhifə nömrəsi',
        example: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Səhifə nömrəsi rəqəm olmalıdır' }),
    (0, class_validator_1.Min)(1, { message: 'Səhifə nömrəsi 1-dən kiçik ola bilməz' }),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hər səhifədə məhsul sayı',
        example: 10,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Səhifə ölçüsü rəqəm olmalıdır' }),
    (0, class_validator_1.Min)(1, { message: 'Səhifə ölçüsü 1-dən kiçik ola bilməz' }),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Kateqoriya ID-si ilə filterlə',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Kateqoriya ID-si rəqəm olmalıdır' }),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Aktiv məhsulları filterlə',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value === 'true';
        }
        return value;
    }),
    __metadata("design:type", Boolean)
], ProductQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Məhsul adı və ya təsvirində axtarış (bütün dillərdə)',
        example: 'samsung',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "searchQuery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sıralama növü',
        example: 'az',
        enum: ['az', 'za', 'newest', 'oldest', 'most-viewed'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['az', 'za', 'newest', 'oldest', 'most-viewed']),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "sort", void 0);
//# sourceMappingURL=product-query.dto.js.map