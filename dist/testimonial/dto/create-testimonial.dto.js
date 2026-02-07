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
exports.CreateTestimonialDto = void 0;
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
        example: 'Əli Məmmədov',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'İngilis dilində mətn',
        example: 'Ali Mammadov',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rus dilində mətn',
        example: 'Али Мамедов',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "ru", void 0);
class MessageMultilingualTextDto {
    az;
    en;
    ru;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Azərbaycan dilində mətn',
        example: 'Bu xidmət çox yaxşıdır...',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], MessageMultilingualTextDto.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'İngilis dilində mətn',
        example: 'This service is very good...',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], MessageMultilingualTextDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rus dilində mətn',
        example: 'Эта услуга очень хорошая...',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], MessageMultilingualTextDto.prototype, "ru", void 0);
class CreateTestimonialDto {
    name;
    message;
    imageUrl;
    isActive = true;
    rating = 5;
}
exports.CreateTestimonialDto = CreateTestimonialDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Müştəri adı (çoxdilli)',
        type: MultilingualTextDto,
        example: {
            az: 'Əli Məmmədov',
            en: 'Ali Mammadov',
            ru: 'Али Мамедов',
        },
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultilingualTextDto),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", MultilingualTextDto)
], CreateTestimonialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Müştəri rəyi (çoxdilli)',
        type: MessageMultilingualTextDto,
        example: {
            az: 'Bu xidmət çox yaxşıdır və həmişə keyfiyyətlidir...',
            en: 'This service is very good and always of high quality...',
            ru: 'Эта услуга очень хорошая и всегда качественная...',
        },
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MessageMultilingualTextDto),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", MessageMultilingualTextDto)
], CreateTestimonialDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Müştəri şəkli URL-i',
        example: '/uploads/testimonials/customer-photo.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTestimonialDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Testimonial aktiv statusu',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value.toLowerCase() === 'true';
        }
        return value;
    }),
    __metadata("design:type", Boolean)
], CreateTestimonialDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Müştəri reytinqi (1-5 arası)',
        example: 5,
        minimum: 1,
        maximum: 5,
        default: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CreateTestimonialDto.prototype, "rating", void 0);
//# sourceMappingURL=create-testimonial.dto.js.map