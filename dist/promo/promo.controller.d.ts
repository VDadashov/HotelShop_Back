import { PromoService } from './promo.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PromoQueryDto } from './dto/promo-query.dto';
export declare class PromoController {
    private readonly promoService;
    constructor(promoService: PromoService);
    findAll(query: PromoQueryDto, isActive?: boolean): Promise<import("../_common/entities/promo.entity").Promo[]>;
    getCurrentPromos(): Promise<import("../_common/entities/promo.entity").Promo[]>;
    findOne(id: number): Promise<import("../_common/entities/promo.entity").Promo>;
    create(createPromoDto: CreatePromoDto): Promise<import("../_common/entities/promo.entity").Promo>;
    update(id: number, updatePromoDto: UpdatePromoDto): Promise<import("../_common/entities/promo.entity").Promo>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
