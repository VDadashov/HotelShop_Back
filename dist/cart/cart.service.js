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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const cart_entity_1 = require("../_common/entities/cart.entity");
const product_entity_1 = require("../_common/entities/product.entity");
let CartService = class CartService {
    cartRepository;
    productRepository;
    constructor(cartRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }
    async getCartItems(query) {
        const { token, page = 1, limit = 10 } = query;
        const cart = await this.cartRepository.findOne({ where: { token } });
        if (!cart) {
            throw new common_1.NotFoundException("Səbət tapılmadı");
        }
        if (!Array.isArray(cart.items) || cart.items.length === 0) {
            return {
                page,
                limit,
                totalItems: 0,
                totalPages: 0,
                items: [],
            };
        }
        const itemIds = cart.items.map((item) => item.id);
        const products = await this.productRepository.find({
            where: { id: (0, typeorm_2.In)(itemIds) },
            select: ["id", "name", "mainImg", "description"],
        });
        const cartDetails = cart.items.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return {
                id: item.id,
                quantity: item.quantity,
                product: product || null,
            };
        });
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedItems = cartDetails.slice(startIndex, endIndex);
        return {
            page,
            limit,
            totalItems: cartDetails.length,
            totalPages: Math.ceil(cartDetails.length / limit),
            items: paginatedItems,
        };
    }
    async createCart(createCartDto) {
        const { items } = createCartDto;
        const productIds = items.map((item) => item.id);
        const existingProducts = await this.productRepository.find({
            where: { id: (0, typeorm_2.In)(productIds) },
            select: ["id"],
        });
        const existingProductIds = existingProducts.map((p) => p.id);
        const missingProductIds = productIds.filter((id) => !existingProductIds.includes(id));
        if (missingProductIds.length > 0) {
            throw new common_1.BadRequestException(`Bu məhsullar tapılmadı: ${missingProductIds.join(", ")}`);
        }
        const invalidItems = items.filter((item) => item.quantity <= 0);
        if (invalidItems.length > 0) {
            throw new common_1.BadRequestException("Məhsul sayı 0-dan böyük olmalıdır");
        }
        const token = (0, uuid_1.v4)();
        const cart = this.cartRepository.create({
            token,
            items,
            isConfirmed: false,
        });
        await this.cartRepository.save(cart);
        return { token };
    }
    async updateCart(updateCartDto) {
        const { token, isConfirmed } = updateCartDto;
        const cart = await this.cartRepository.findOne({ where: { token } });
        if (!cart) {
            throw new common_1.NotFoundException("Səbət tapılmadı");
        }
        cart.isConfirmed = isConfirmed;
        await this.cartRepository.save(cart);
        return { message: "Səbət statusu uğurla yeniləndi" };
    }
    async findCartByToken(token) {
        const cart = await this.cartRepository.findOne({ where: { token } });
        if (!cart) {
            throw new common_1.NotFoundException("Səbət tapılmadı");
        }
        return cart;
    }
    async deleteCart(token) {
        const cart = await this.findCartByToken(token);
        await this.cartRepository.remove(cart);
        return { message: "Səbət uğurla silindi" };
    }
    async addItemToCart(token, productId, quantity) {
        const cart = await this.findCartByToken(token);
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException("Məhsul tapılmadı");
        }
        if (quantity <= 0) {
            throw new common_1.BadRequestException("Məhsul sayı 0-dan böyük olmalıdır");
        }
        const existingItemIndex = cart.items.findIndex((item) => item.id === productId);
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        }
        else {
            cart.items.push({ id: productId, quantity });
        }
        return await this.cartRepository.save(cart);
    }
    async removeItemFromCart(token, productId) {
        const cart = await this.findCartByToken(token);
        cart.items = cart.items.filter((item) => item.id !== productId);
        return await this.cartRepository.save(cart);
    }
    async updateItemQuantity(token, productId, quantity) {
        const cart = await this.findCartByToken(token);
        if (quantity <= 0) {
            throw new common_1.BadRequestException("Məhsul sayı 0-dan böyük olmalıdır");
        }
        const itemIndex = cart.items.findIndex((item) => item.id === productId);
        if (itemIndex === -1) {
            throw new common_1.NotFoundException("Məhsul səbətdə tapılmadı");
        }
        cart.items[itemIndex].quantity = quantity;
        return await this.cartRepository.save(cart);
    }
    async getAllCarts() {
        return await this.cartRepository.find();
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map