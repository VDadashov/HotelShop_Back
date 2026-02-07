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
exports.CreateFaqDto = void 0;
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
        example: 'Sifarişi necə verə bilərəm?',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: 'Mətn ən azı 3 simvol olmalıdır' }),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'İngilis dilində mətn',
        example: 'How can I place an order?',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: 'Mətn ən azı 3 simvol olmalıdır' }),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rus dilində mətn',
        example: 'Как я могу сделать заказ?',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: 'Mətn ən azı 3 simvol olmalıdır' }),
    __metadata("design:type", String)
], MultilingualTextDto.prototype, "ru", void 0);
class CreateFaqDto {
    question;
    answer;
    isActive = true;
}
exports.CreateFaqDto = CreateFaqDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'FAQ sualı (çoxdilli)',
        type: MultilingualTextDto,
        example: {
            az: 'Sifarişi necə verə bilərəm?',
            en: 'How can I place an order?',
            ru: 'Как я могу сделать заказ?',
        },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultilingualTextDto),
    __metadata("design:type", MultilingualTextDto)
], CreateFaqDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'FAQ cavabı (çoxdilli)',
        type: MultilingualTextDto,
        example: {
            az: 'Sifariş vermək üçün sayta daxil olub məhsulu seçməlisiniz...',
            en: 'To place an order, you need to log in to the site and select the product...',
            ru: 'Чтобы сделать заказ, вам нужно войти на сайт и выбрать товар...',
        },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultilingualTextDto),
    __metadata("design:type", MultilingualTextDto)
], CreateFaqDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'FAQ-ın aktiv olub-olmaması',
        example: true,
        required: false,
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
], CreateFaqDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-faq.dto.js.map