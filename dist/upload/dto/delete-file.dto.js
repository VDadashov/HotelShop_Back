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
exports.DeleteFileDto = exports.ResourceType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ResourceType;
(function (ResourceType) {
    ResourceType["IMAGE"] = "image";
    ResourceType["VIDEO"] = "video";
    ResourceType["RAW"] = "raw";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
class DeleteFileDto {
    publicId;
    resourceType = ResourceType.IMAGE;
}
exports.DeleteFileDto = DeleteFileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cloudinary public ID',
        example: 'hotelshop/images/1764608698070-364854808',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteFileDto.prototype, "publicId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Resource type',
        enum: ResourceType,
        default: ResourceType.IMAGE,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(ResourceType),
    __metadata("design:type", String)
], DeleteFileDto.prototype, "resourceType", void 0);
//# sourceMappingURL=delete-file.dto.js.map