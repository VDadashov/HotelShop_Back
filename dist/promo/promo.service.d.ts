import { Repository } from 'typeorm';
import { Promo } from '../_common/entities/promo.entity';
import { Product } from '../_common/entities/product.entity';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PromoQueryDto } from './dto/promo-query.dto';
export declare class PromoService {
    private readonly promoRepository;
    private readonly productRepository;
    constructor(promoRepository: Repository<Promo>, productRepository: Repository<Product>);
    private resolveImage;
    findAll(query: PromoQueryDto): Promise<Promo[]>;
    findOne(id: number): Promise<Promo>;
    create(createPromoDto: CreatePromoDto): Promise<Promo>;
    update(id: number, updatePromoDto: UpdatePromoDto): Promise<Promo>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getCurrentPromos(): Promise<Promo[]>;
}
