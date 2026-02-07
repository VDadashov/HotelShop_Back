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
exports.CreateCartDto = exports.CartItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CartItemDto {
    id;
    quantity;
}
exports.CartItemDto = CartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Məhsul ID-si',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Məhsul ID-si rəqəm olmalıdır' }),
    __metadata("design:type", Number)
], CartItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Məhsul sayı',
        example: 2,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Məhsul sayı rəqəm olmalıdır' }),
    __metadata("design:type", Number)
], CartItemDto.prototype, "quantity", void 0);
class CreateCartDto {
    items;
}
exports.CreateCartDto = CreateCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Səbətdəki məhsullar',
        type: [CartItemDto],
        example: [
            { id: 1, quantity: 2 },
            { id: 3, quantity: 1 }
        ]
    }),
    (0, class_validator_1.IsArray)({ message: 'Items array olmalıdır' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Ən azı bir məhsul olmalıdır' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CartItemDto),
    __metadata("design:type", Array)
], CreateCartDto.prototype, "items", void 0);
//# sourceMappingURL=create-cart.dto.js.map