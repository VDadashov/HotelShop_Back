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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("./cart.service");
const create_cart_dto_1 = require("./dto/create-cart.dto");
const update_cart_dto_1 = require("./dto/update-cart.dto");
const cart_query_dto_1 = require("./dto/cart-query.dto");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getCartItems(query) {
        return await this.cartService.getCartItems(query);
    }
    async createCart(createCartDto) {
        return await this.cartService.createCart(createCartDto);
    }
    async updateCart(updateCartDto) {
        return await this.cartService.updateCart(updateCartDto);
    }
    async deleteCart(token) {
        return await this.cartService.deleteCart(token);
    }
    async addItemToCart(token, productId, quantity) {
        return await this.cartService.addItemToCart(token, productId, quantity);
    }
    async removeItemFromCart(token, productId) {
        return await this.cartService.removeItemFromCart(token, productId);
    }
    async updateItemQuantity(token, productId, quantity) {
        return await this.cartService.updateItemQuantity(token, productId, quantity);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)('items'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tokenə əsasən səbət məhsullarını səhifələmə ilə gətir'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Səhifələnmiş səbət məhsul siyahısı',
        schema: {
            type: 'object',
            properties: {
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                totalItems: { type: 'number', example: 25 },
                totalPages: { type: 'number', example: 3 },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            quantity: { type: 'number', example: 2 },
                            product: {
                                type: 'object',
                                nullable: true,
                                properties: {
                                    id: { type: 'number', example: 1 },
                                    name: {
                                        type: 'object',
                                        properties: {
                                            az: { type: 'string', example: 'Samsung Galaxy S21' },
                                            en: { type: 'string', example: 'Samsung Galaxy S21' },
                                            ru: { type: 'string', example: 'Самсунг Галакси S21' },
                                        }
                                    },
                                    mainImg: { type: 'string', example: '/uploads/samsung-s21.jpg' },
                                    description: {
                                        type: 'object',
                                        properties: {
                                            az: { type: 'string', example: 'Ən yeni smartfon...' },
                                            en: { type: 'string', example: 'Latest smartphone...' },
                                            ru: { type: 'string', example: 'Новейший смартфон...' },
                                        }
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Token tələb olunur',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Səbət tapılmadı',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'token',
        required: true,
        type: String,
        description: 'Səbət tokeni (UUID)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Səhifə nömrəsi',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Hər səhifədə məhsul sayı',
        example: 10,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_query_dto_1.CartQueryDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCartItems", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'Yeni səbət yaradıb yalnız token qaytar' }),
    (0, swagger_1.ApiBody)({
        description: 'Səbət məhsulları',
        type: create_cart_dto_1.CreateCartDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Səbət yaradıldı və token qaytarıldı',
        schema: {
            type: 'object',
            properties: {
                token: {
                    type: 'string',
                    example: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Validasiya xətası və ya məhsul tapılmadı',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cart_dto_1.CreateCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "createCart", null);
__decorate([
    (0, common_1.Patch)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'Səbət isConfirmed statusunu dəyiş' }),
    (0, swagger_1.ApiBody)({
        description: 'Səbət status yeniləməsi',
        type: update_cart_dto_1.UpdateCartDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Səbət statusu uğurla dəyişdirildi',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Səbət statusu uğurla yeniləndi',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Səbət tapılmadı',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cart_dto_1.UpdateCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
__decorate([
    (0, common_1.Delete)(':token'),
    (0, swagger_1.ApiOperation)({ summary: 'Səbəti sil' }),
    (0, swagger_1.ApiParam)({
        name: 'token',
        type: 'string',
        description: 'Səbət tokeni (UUID)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Səbət uğurla silindi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Səbət tapılmadı',
    }),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCart", null);
__decorate([
    (0, common_1.Post)(':token/items/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Səbətə məhsul əlavə et' }),
    (0, swagger_1.ApiParam)({
        name: 'token',
        type: 'string',
        description: 'Səbət tokeni',
    }),
    (0, swagger_1.ApiParam)({
        name: 'productId',
        type: 'number',
        description: 'Məhsul ID-si',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                quantity: {
                    type: 'number',
                    example: 1,
                    description: 'Əlavə ediləcək məhsul sayı',
                },
            },
            required: ['quantity'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Məhsul səbətə əlavə edildi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Səbət və ya məhsul tapılmadı',
    }),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('quantity', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addItemToCart", null);
__decorate([
    (0, common_1.Delete)(':token/items/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Səbətdən məhsul sil' }),
    (0, swagger_1.ApiParam)({
        name: 'token',
        type: 'string',
        description: 'Səbət tokeni',
    }),
    (0, swagger_1.ApiParam)({
        name: 'productId',
        type: 'number',
        description: 'Məhsul ID-si',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Məhsul səbətdən silindi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Səbət tapılmadı',
    }),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeItemFromCart", null);
__decorate([
    (0, common_1.Patch)(':token/items/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Səbətdəki məhsul sayını yenilə' }),
    (0, swagger_1.ApiParam)({
        name: 'token',
        type: 'string',
        description: 'Səbət tokeni',
    }),
    (0, swagger_1.ApiParam)({
        name: 'productId',
        type: 'number',
        description: 'Məhsul ID-si',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                quantity: {
                    type: 'number',
                    example: 3,
                    description: 'Yeni məhsul sayı',
                },
            },
            required: ['quantity'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Məhsul sayı yeniləndi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Səbət və ya məhsul tapılmadı',
    }),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('quantity', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateItemQuantity", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map