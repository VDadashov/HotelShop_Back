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
exports.CartQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CartQueryDto {
    token;
    page = 1;
    limit = 10;
}
exports.CartQueryDto = CartQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Səbət tokeni',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsString)({ message: 'Token string olmalıdır' }),
    (0, class_validator_1.IsUUID)(4, { message: 'Token düzgün UUID format olmalıdır' }),
    __metadata("design:type", String)
], CartQueryDto.prototype, "token", void 0);
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
], CartQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hər səhifədə məhsul sayı',
        example: 10,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Limit rəqəm olmalıdır' }),
    (0, class_validator_1.Min)(1, { message: 'Limit 1-dən kiçik ola bilməz' }),
    __metadata("design:type", Number)
], CartQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=cart-query.dto.js.map