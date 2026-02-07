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
exports.AdditionalData = exports.MediaFile = exports.MultiLanguageText = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class MultiLanguageText {
    az;
    en;
    ru;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.MultiLanguageText = MultiLanguageText;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultiLanguageText.prototype, "az", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultiLanguageText.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MultiLanguageText.prototype, "ru", void 0);
class MediaFile {
    url;
    type;
    size;
    mimeType;
    alt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.MediaFile = MediaFile;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MediaFile.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['image', 'video'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['image', 'video']),
    __metadata("design:type", String)
], MediaFile.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MediaFile.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MediaFile.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultiLanguageText),
    __metadata("design:type", MultiLanguageText)
], MediaFile.prototype, "alt", void 0);
class AdditionalData {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.AdditionalData = AdditionalData;
//# sourceMappingURL=common-types.js.map