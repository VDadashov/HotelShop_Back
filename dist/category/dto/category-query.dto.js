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
exports.CategoryQueryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CategoryQueryDto {
    page = 1;
    pageSize = 10;
    isActive;
    parentId;
    level;
    search;
}
exports.CategoryQueryDto = CategoryQueryDto;
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
], CategoryQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hər səhifədə element sayı',
        example: 10,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Səhifə ölçüsü rəqəm olmalıdır' }),
    (0, class_validator_1.Min)(1, { message: 'Səhifə ölçüsü 1-dən kiçik ola bilməz' }),
    __metadata("design:type", Number)
], CategoryQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        if (value === true || value === false)
            return value;
        return undefined;
    }),
    __metadata("design:type", Boolean)
], CategoryQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const parsed = parseInt(value);
        return isNaN(parsed) ? undefined : parsed;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'ParentId rəqəm olmalıdır' }),
    (0, class_validator_1.Min)(0, { message: 'ParentId ən azı 0 olmalıdır' }),
    __metadata("design:type", Number)
], CategoryQueryDto.prototype, "parentId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const parsed = parseInt(value);
        return isNaN(parsed) ? undefined : parsed;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Level rəqəm olmalıdır' }),
    (0, class_validator_1.Min)(1, { message: 'Level ən azı 1 olmalıdır' }),
    __metadata("design:type", Number)
], CategoryQueryDto.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoryQueryDto.prototype, "search", void 0);
//# sourceMappingURL=category-query.dto.js.map