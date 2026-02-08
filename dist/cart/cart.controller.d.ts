import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { CartQueryDto } from "./dto/cart-query.dto";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCartItems(query: CartQueryDto): Promise<import("./cart.service").PaginatedCartItems>;
    getAllCarts(): Promise<import("../_common/entities/cart.entity").Cart[]>;
    createCart(createCartDto: CreateCartDto): Promise<{
        token: string;
    }>;
    updateCart(updateCartDto: UpdateCartDto): Promise<{
        message: string;
    }>;
    deleteCart(token: string): Promise<{
        message: string;
    }>;
    addItemToCart(token: string, productId: number, quantity: number): Promise<import("../_common/entities/cart.entity").Cart>;
    removeItemFromCart(token: string, productId: number): Promise<import("../_common/entities/cart.entity").Cart>;
    updateItemQuantity(token: string, productId: number, quantity: number): Promise<import("../_common/entities/cart.entity").Cart>;
}
