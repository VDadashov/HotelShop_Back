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
exports.PromoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const promo_entity_1 = require("../_common/entities/promo.entity");
const product_entity_1 = require("../_common/entities/product.entity");
let PromoService = class PromoService {
    promoRepository;
    productRepository;
    constructor(promoRepository, productRepository) {
        this.promoRepository = promoRepository;
        this.productRepository = productRepository;
    }
    resolveImage(promo) {
        if (promo.backgroundImg) {
            return promo.backgroundImg;
        }
        if (promo.product && promo.product.mainImg) {
            return promo.product.mainImg;
        }
        return null;
    }
    async findAll(query) {
        const queryBuilder = this.promoRepository.createQueryBuilder('promo')
            .leftJoinAndSelect('promo.product', 'product');
        if (query.isActive !== undefined) {
            queryBuilder.andWhere('promo.isActive = :isActive', { isActive: query.isActive });
        }
        if (query.productId) {
            queryBuilder.andWhere('promo.productId = :productId', { productId: query.productId });
        }
        if (query.current) {
            const now = new Date();
            queryBuilder.andWhere('promo.startDate <= :now AND promo.endDate >= :now', { now });
        }
        if (query.startDateFrom) {
            queryBuilder.andWhere('promo.startDate >= :startDateFrom', {
                startDateFrom: new Date(query.startDateFrom)
            });
        }
        if (query.startDateTo) {
            queryBuilder.andWhere('promo.startDate <= :startDateTo', {
                startDateTo: new Date(query.startDateTo)
            });
        }
        if (query.search && query.search.trim() !== '') {
            const searchTerm = `%${query.search.trim().toLowerCase()}%`;
            queryBuilder.andWhere(`(
          LOWER(promo.title->>'az') LIKE LOWER(:search) OR 
          LOWER(promo.title->>'en') LIKE LOWER(:search) OR 
          LOWER(promo.title->>'ru') LIKE LOWER(:search) OR
          LOWER(promo.subtitle->>'az') LIKE LOWER(:search) OR 
          LOWER(promo.subtitle->>'en') LIKE LOWER(:search) OR 
          LOWER(promo.subtitle->>'ru') LIKE LOWER(:search) OR
          LOWER(promo.description->>'az') LIKE LOWER(:search) OR 
          LOWER(promo.description->>'en') LIKE LOWER(:search) OR 
          LOWER(promo.description->>'ru') LIKE LOWER(:search)
        )`, { search: searchTerm });
        }
        switch (query.sort) {
            case 'newest':
                queryBuilder.orderBy('promo.createdAt', 'DESC');
                break;
            case 'oldest':
                queryBuilder.orderBy('promo.createdAt', 'ASC');
                break;
            case 'start-date-asc':
                queryBuilder.orderBy('promo.startDate', 'ASC');
                break;
            case 'start-date-desc':
                queryBuilder.orderBy('promo.startDate', 'DESC');
                break;
            case 'end-date-asc':
                queryBuilder.orderBy('promo.endDate', 'ASC');
                break;
            case 'end-date-desc':
                queryBuilder.orderBy('promo.endDate', 'DESC');
                break;
            case 'title-az':
                queryBuilder.orderBy("promo.title->>'az'", 'ASC');
                break;
            case 'title-za':
                queryBuilder.orderBy("promo.title->>'az'", 'DESC');
                break;
            default:
                queryBuilder.orderBy('promo.startDate', 'DESC');
        }
        const promos = await queryBuilder.getMany();
        return promos.map(promo => ({
            ...promo,
            backgroundImg: this.resolveImage(promo),
        }));
    }
    async findOne(id) {
        const promo = await this.promoRepository.findOne({
            where: { id },
            relations: ['product'],
        });
        if (!promo) {
            throw new common_1.NotFoundException('Promo tapılmadı');
        }
        return {
            ...promo,
            backgroundImg: this.resolveImage(promo),
        };
    }
    async create(createPromoDto) {
        const startDate = new Date(createPromoDto.startDate);
        const endDate = new Date(createPromoDto.endDate);
        if (startDate >= endDate) {
            throw new common_1.BadRequestException('Bitmə tarixi başlama tarixindən sonra olmalıdır');
        }
        const product = await this.productRepository.findOne({
            where: { id: createPromoDto.productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Məhsul tapılmadı');
        }
        const promo = this.promoRepository.create({
            ...createPromoDto,
            startDate,
            endDate,
            product,
        });
        const savedPromo = await this.promoRepository.save(promo);
        const promoWithProduct = await this.findOne(savedPromo.id);
        return promoWithProduct;
    }
    async update(id, updatePromoDto) {
        const promo = await this.promoRepository.findOne({
            where: { id },
            relations: ['product'],
        });
        if (!promo) {
            throw new common_1.NotFoundException('Promo tapılmadı');
        }
        if (updatePromoDto.startDate || updatePromoDto.endDate) {
            const startDate = updatePromoDto.startDate ? new Date(updatePromoDto.startDate) : promo.startDate;
            const endDate = updatePromoDto.endDate ? new Date(updatePromoDto.endDate) : promo.endDate;
            if (startDate >= endDate) {
                throw new common_1.BadRequestException('Bitmə tarixi başlama tarixindən sonra olmalıdır');
            }
            if (updatePromoDto.startDate) {
                promo.startDate = startDate;
            }
            if (updatePromoDto.endDate) {
                promo.endDate = endDate;
            }
        }
        if (updatePromoDto.productId && updatePromoDto.productId !== promo.product.id) {
            const product = await this.productRepository.findOne({
                where: { id: updatePromoDto.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException('Məhsul tapılmadı');
            }
            promo.product = product;
        }
        Object.assign(promo, updatePromoDto);
        const savedPromo = await this.promoRepository.save(promo);
        return {
            ...savedPromo,
            backgroundImg: this.resolveImage(savedPromo),
        };
    }
    async remove(id) {
        const promo = await this.promoRepository.findOne({ where: { id } });
        if (!promo) {
            throw new common_1.NotFoundException('Promo tapılmadı');
        }
        await this.promoRepository.remove(promo);
        return { message: 'Promo uğurla silindi' };
    }
    async getCurrentPromos() {
        const now = new Date();
        const queryBuilder = this.promoRepository.createQueryBuilder('promo')
            .leftJoinAndSelect('promo.product', 'product')
            .where('promo.isActive = :isActive', { isActive: true })
            .andWhere('promo.startDate <= :now', { now })
            .andWhere('promo.endDate >= :now', { now })
            .orderBy('promo.startDate', 'DESC');
        const promos = await queryBuilder.getMany();
        return promos.map(promo => ({
            ...promo,
            backgroundImg: this.resolveImage(promo),
        }));
    }
};
exports.PromoService = PromoService;
exports.PromoService = PromoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promo_entity_1.Promo)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PromoService);
//# sourceMappingURL=promo.service.js.map