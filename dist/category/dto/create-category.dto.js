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
exports.CreateCategoryDto = exports.MultilingualTextDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class MultilingualTextDto {
    az;
    en;
    ru;
}
exports.MultilingualTextDto = MultilingualTextDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Azərbaycan dilində mətn',
        example: 'Elektronika',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'İngilis dilində mətn',
        example: 'Electronics',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rus dilində mətn',
        example: 'Электроника',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "ru", void 0);
class CreateCategoryDto {
    name;
    index;
    isActive;
    isProductHolder;
    parentId;
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Kateqoriya adı (çoxdilli)',
        type: MultilingualTextDto,
        example: {
            az: 'Elektronika',
            en: 'Electronics',
            ru: 'Электроника',
        },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultilingualTextDto),
    __metadata("design:type", MultilingualTextDto)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sıralama üçün indeks (artan şəkildə göstəriləcək)',
        default: 0,
        example: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCategoryDto.prototype, "index", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Kateqoriya aktiv statusu',
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCategoryDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Bu kateqoriya məhsul saxlaya bilərmi',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCategoryDto.prototype, "isProductHolder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Parent kateqoriya ID-si',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCategoryDto.prototype, "parentId", void 0);
//# sourceMappingURL=create-category.dto.js.map