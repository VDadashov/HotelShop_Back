import { Repository } from "typeorm";
import { Cart } from "../_common/entities/cart.entity";
import { Product } from "../_common/entities/product.entity";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { CartQueryDto } from "./dto/cart-query.dto";
export interface CartItemWithProduct {
    id: number;
    quantity: number;
    product: Product | null;
}
export interface PaginatedCartItems {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    items: CartItemWithProduct[];
}
export declare class CartService {
    private readonly cartRepository;
    private readonly productRepository;
    constructor(cartRepository: Repository<Cart>, productRepository: Repository<Product>);
    getCartItems(query: CartQueryDto): Promise<PaginatedCartItems>;
    createCart(createCartDto: CreateCartDto): Promise<{
        token: string;
    }>;
    updateCart(updateCartDto: UpdateCartDto): Promise<{
        message: string;
    }>;
    findCartByToken(token: string): Promise<Cart>;
    deleteCart(token: string): Promise<{
        message: string;
    }>;
    addItemToCart(token: string, productId: number, quantity: number): Promise<Cart>;
    removeItemFromCart(token: string, productId: number): Promise<Cart>;
    updateItemQuantity(token: string, productId: number, quantity: number): Promise<Cart>;
    getAllCarts(): Promise<Cart[]>;
}
