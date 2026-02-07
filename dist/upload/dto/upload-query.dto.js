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
exports.UploadQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UploadQueryDto {
    page = 1;
    pageSize = 10;
    resourceType = 'image';
    folder;
}
exports.UploadQueryDto = UploadQueryDto;
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
], UploadQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hər səhifədə fayl sayı',
        example: 10,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Səhifə ölçüsü rəqəm olmalıdır' }),
    (0, class_validator_1.Min)(1, { message: 'Səhifə ölçüsü 1-dən kiçik ola bilməz' }),
    __metadata("design:type", Number)
], UploadQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Resource type filteri (avtomatik folder müəyyən edir: image→images, video→videos, raw→pdfs)',
        example: 'image',
        enum: ['image', 'video', 'raw'],
        default: 'image',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['image', 'video', 'raw']),
    __metadata("design:type", String)
], UploadQueryDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Folder filteri (optional - resourceType-dan avtomatik müəyyən olunur)',
        example: 'images',
        enum: ['images', 'pdfs', 'videos'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['images', 'pdfs', 'videos']),
    __metadata("design:type", String)
], UploadQueryDto.prototype, "folder", void 0);
//# sourceMappingURL=upload-query.dto.js.map