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
exports.CreateSectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const common_types_1 = require("../../_common/classes/common-types");
class CreateSectionDto {
    name;
    type;
    title;
    description;
    pageId;
    order = 0;
    visibility = 'both';
    isActive = true;
    media = null;
    additionalData = null;
}
exports.CreateSectionDto = CreateSectionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [
            'hero',
            'content',
            'about',
            'services',
            'gallery',
            'contact',
            'footer',
            'navbar',
            'testimonial',
            'blog',
            'custom',
        ],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)([
        'hero',
        'content',
        'about',
        'services',
        'gallery',
        'contact',
        'footer',
        'navbar',
        'testimonial',
        'blog',
        'custom',
    ]),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => common_types_1.MultiLanguageText),
    __metadata("design:type", common_types_1.MultiLanguageText)
], CreateSectionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => common_types_1.MultiLanguageText),
    __metadata("design:type", common_types_1.MultiLanguageText)
], CreateSectionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSectionDto.prototype, "pageId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSectionDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['desktop', 'mobile', 'both'], default: 'both' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['desktop', 'mobile', 'both']),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "visibility", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSectionDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, default: null }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => common_types_1.MediaFile),
    __metadata("design:type", Object)
], CreateSectionDto.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, default: null }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => common_types_1.AdditionalData),
    __metadata("design:type", Object)
], CreateSectionDto.prototype, "additionalData", void 0);
//# sourceMappingURL=create-section.dto.js.map