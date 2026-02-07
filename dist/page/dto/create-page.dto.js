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
exports.CreatePageDto = exports.MultiLanguageTitle = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class MultiLanguageTitle {
    az;
    en;
    ru;
}
exports.MultiLanguageTitle = MultiLanguageTitle;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title in Azerbaijani',
        example: 'Ana Səhifə',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultiLanguageTitle.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title in English',
        example: 'Home Page',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MultiLanguageTitle.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title in Russian',
        example: 'Главная страница',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MultiLanguageTitle.prototype, "ru", void 0);
class CreatePageDto {
    title;
    isActive = true;
}
exports.CreatePageDto = CreatePageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page title in multiple languages',
        type: MultiLanguageTitle,
        example: {
            az: 'Ana Səhifə',
            en: 'Home Page',
            ru: 'Главная страница',
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", MultiLanguageTitle)
], CreatePageDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the page is active',
        example: true,
        default: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePageDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-page.dto.js.map