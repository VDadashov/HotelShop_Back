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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../_common/entities/product.entity");
const category_entity_1 = require("../_common/entities/category.entity");
const i18n_service_1 = require("../i18n/i18n.service");
let ProductService = class ProductService {
    productRepository;
    categoryRepository;
    i18n;
    constructor(productRepository, categoryRepository, i18n) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.i18n = i18n;
    }
    async findAll(query, acceptLanguage) {
        const { page = 1, pageSize = 10, categoryId, isActive, searchQuery, sort } = query;
        const offset = (page - 1) * pageSize;
        const queryBuilder = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category');
        if (categoryId) {
            queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('product.isActive = :isActive', { isActive });
        }
        if (searchQuery) {
            if (acceptLanguage) {
                queryBuilder.andWhere(`(product.name ->> :lang ILIKE :search OR product.description ->> :lang ILIKE :search)`, { lang: acceptLanguage, search: `%${searchQuery}%` });
            }
            else {
                queryBuilder.andWhere(`(product.name ->> 'az' ILIKE :search OR 
            product.name ->> 'en' ILIKE :search OR 
            product.name ->> 'ru' ILIKE :search OR
            product.description ->> 'az' ILIKE :search OR 
            product.description ->> 'en' ILIKE :search OR 
            product.description ->> 'ru' ILIKE :search)`, { search: `%${searchQuery}%` });
            }
        }
        switch (sort) {
            case 'az':
                queryBuilder.orderBy('product.id', 'ASC');
                break;
            case 'za':
                queryBuilder.orderBy('product.id', 'DESC');
                break;
            case 'newest':
                queryBuilder.orderBy('product.createdAt', 'DESC');
                break;
            case 'oldest':
                queryBuilder.orderBy('product.createdAt', 'ASC');
                break;
            case 'most-viewed':
                queryBuilder.orderBy('product.views', 'DESC');
                break;
            default:
                queryBuilder.orderBy('product.id', 'DESC');
        }
        const totalItems = await queryBuilder.getCount();
        const products = await queryBuilder
            .skip(offset)
            .take(pageSize)
            .getMany();
        return {
            data: products,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / pageSize),
                currentPage: page,
                pageSize,
            },
        };
    }
    async findAllForAdmin(query) {
        const { page = 1, pageSize = 10, categoryId, isActive, searchQuery, sort } = query;
        const offset = (page - 1) * pageSize;
        const queryBuilder = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category');
        if (categoryId) {
            queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('product.isActive = :isActive', { isActive });
        }
        if (searchQuery) {
            queryBuilder.andWhere(`(product.name ->> 'az' ILIKE :search OR 
          product.name ->> 'en' ILIKE :search OR 
          product.name ->> 'ru' ILIKE :search OR
          product.description ->> 'az' ILIKE :search OR 
          product.description ->> 'en' ILIKE :search OR 
          product.description ->> 'ru' ILIKE :search)`, { search: `%${searchQuery}%` });
        }
        switch (sort) {
            case 'az':
                queryBuilder.orderBy('product.id', 'ASC');
                break;
            case 'za':
                queryBuilder.orderBy('product.id', 'DESC');
                break;
            case 'newest':
                queryBuilder.orderBy('product.createdAt', 'DESC');
                break;
            case 'oldest':
                queryBuilder.orderBy('product.createdAt', 'ASC');
                break;
            case 'most-viewed':
                queryBuilder.orderBy('product.views', 'DESC');
                break;
            default:
                queryBuilder.orderBy('product.id', 'DESC');
        }
        const totalItems = await queryBuilder.getCount();
        const products = await queryBuilder
            .skip(offset)
            .take(pageSize)
            .getMany();
        return {
            data: products,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / pageSize),
                currentPage: page,
                pageSize,
            },
        };
    }
    async findOne(id, acceptLanguage) {
        const lang = acceptLanguage || 'az';
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product) {
            throw new common_1.NotFoundException('Məhsul tapılmadı');
        }
        return {
            ...product,
            name: this.i18n.translateField(product.name, lang),
            description: this.i18n.translateField(product.description, lang),
            category: product.category ? {
                ...product.category,
                name: this.i18n.translateField(product.category.name, lang),
            } : null,
        };
    }
    async findOneForAdmin(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product) {
            throw new common_1.NotFoundException('Məhsul tapılmadı');
        }
        return product;
    }
    async create(createProductDto) {
        const category = await this.categoryRepository.findOne({
            where: { id: createProductDto.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Kateqoriya tapılmadı');
        }
        const product = this.productRepository.create({
            ...createProductDto,
            category,
        });
        return await this.productRepository.save(product);
    }
    async update(id, updateProductDto) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product) {
            throw new common_1.NotFoundException('Məhsul tapılmadı');
        }
        if (updateProductDto.categoryId !== undefined) {
            const currentCategoryId = product.category?.id || null;
            if (updateProductDto.categoryId !== currentCategoryId) {
                const category = await this.categoryRepository.findOne({
                    where: {
                        id: updateProductDto.categoryId,
                    },
                });
                if (!category) {
                    throw new common_1.NotFoundException('Kateqoriya tapılmadı və ya silinib');
                }
                product.category = category;
            }
            delete updateProductDto.categoryId;
        }
        Object.assign(product, updateProductDto);
        const updated = await this.productRepository.save(product);
        return this.findOne(id);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
        return { message: 'Məhsul uğurla silindi' };
    }
    async incrementViews(id) {
        const product = await this.findOne(id);
        product.views += 1;
        await this.productRepository.save(product);
        return {
            message: 'Baxış sayı artırıldı',
            views: product.views,
        };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        i18n_service_1.I18nService])
], ProductService);
//# sourceMappingURL=product.service.js.map