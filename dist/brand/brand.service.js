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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const brand_entity_1 = require("../_common/entities/brand.entity");
const i18n_service_1 = require("../i18n/i18n.service");
let BrandService = class BrandService {
    brandRepository;
    i18n;
    constructor(brandRepository, i18n) {
        this.brandRepository = brandRepository;
        this.i18n = i18n;
    }
    async create(createBrandDto) {
        const existingBrandCheck = await this.brandRepository
            .createQueryBuilder('brand')
            .where("brand.name->>'az' = :name", { name: createBrandDto.name.az })
            .getOne();
        if (existingBrandCheck) {
            throw new common_1.BadRequestException('Bu adda brand artıq mövcuddur');
        }
        const brand = this.brandRepository.create({
            name: createBrandDto.name,
            imageUrl: createBrandDto.imageUrl,
            isActive: createBrandDto.isActive ?? true,
        });
        return await this.brandRepository.save(brand);
    }
    async getAll(lang, isActive) {
        lang = lang || 'az';
        const whereCondition = {};
        if (isActive !== undefined) {
            whereCondition.isActive = isActive;
        }
        const brands = await this.brandRepository.find({
            where: whereCondition,
            order: {
                id: 'ASC',
            },
        });
        return brands.map((brand) => ({
            ...brand,
            name: this.i18n.translateField(brand.name, lang),
        }));
    }
    async getAllForAdmin(isActive) {
        const whereCondition = {};
        if (isActive !== undefined) {
            whereCondition.isActive = isActive;
        }
        return await this.brandRepository.find({
            where: whereCondition,
            order: {
                id: 'ASC',
            },
        });
    }
    async findAll(queryDto = {}, lang) {
        lang = lang || 'az';
        const { page = 1, limit = 10, isActive, search } = queryDto;
        const skip = (page - 1) * limit;
        const queryBuilder = this.brandRepository.createQueryBuilder('brand');
        if (isActive !== undefined) {
            queryBuilder.andWhere('brand.isActive = :isActive', { isActive });
        }
        if (search) {
            queryBuilder.andWhere("(brand.name->>'az' ILIKE :search OR brand.name->>'en' ILIKE :search OR brand.name->>'ru' ILIKE :search)", { search: `%${search}%` });
        }
        queryBuilder.orderBy('brand.id', 'ASC').skip(skip).take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();
        const translatedData = data.map((brand) => ({
            ...brand,
            name: this.i18n.translateField(brand.name, lang),
        }));
        return {
            data: translatedData,
            total,
            page,
            limit,
        };
    }
    async findAllForAdmin(queryDto = {}) {
        const { page = 1, limit = 10, isActive, search } = queryDto;
        const skip = (page - 1) * limit;
        const queryBuilder = this.brandRepository.createQueryBuilder('brand');
        if (isActive !== undefined) {
            queryBuilder.andWhere('brand.isActive = :isActive', { isActive });
        }
        if (search) {
            queryBuilder.andWhere("(brand.name->>'az' ILIKE :search OR brand.name->>'en' ILIKE :search OR brand.name->>'ru' ILIKE :search)", { search: `%${search}%` });
        }
        queryBuilder.orderBy('brand.id', 'ASC').skip(skip).take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async findOne(id, lang) {
        lang = lang || 'az';
        const brand = await this.brandRepository.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!brand) {
            throw new common_1.NotFoundException(`ID ${id} olan brand tapılmadı`);
        }
        return {
            ...brand,
            name: this.i18n.translateField(brand.name, lang),
        };
    }
    async findOneForAdmin(id) {
        const brand = await this.brandRepository.findOne({
            where: { id },
        });
        if (!brand) {
            throw new common_1.NotFoundException(`ID ${id} olan brand tapılmadı`);
        }
        return brand;
    }
    async update(id, updateBrandDto) {
        const brand = await this.findOneForAdmin(id);
        if (updateBrandDto.name && updateBrandDto.name.az !== brand.name.az) {
            const existingBrand = await this.brandRepository
                .createQueryBuilder('brand')
                .where("brand.name->>'az' = :name", { name: updateBrandDto.name.az })
                .andWhere('brand.id != :id', { id })
                .getOne();
            if (existingBrand) {
                throw new common_1.BadRequestException('Bu adda brand artıq mövcuddur');
            }
        }
        Object.assign(brand, updateBrandDto);
        return await this.brandRepository.save(brand);
    }
    async remove(id) {
        const brand = await this.findOneForAdmin(id);
        await this.brandRepository.remove(brand);
    }
    async getActiveBrands(lang) {
        lang = lang || 'az';
        const brands = await this.brandRepository.find({
            where: { isActive: true },
            order: { id: 'ASC' },
        });
        return brands.map((brand) => ({
            ...brand,
            name: this.i18n.translateField(brand.name, lang),
        }));
    }
    async getActiveBrandsForAdmin() {
        return await this.brandRepository.find({
            where: { isActive: true },
            order: { id: 'ASC' },
        });
    }
    async toggleStatus(id) {
        const brand = await this.findOneForAdmin(id);
        brand.isActive = !brand.isActive;
        return await this.brandRepository.save(brand);
    }
    async searchByName(name, lang) {
        lang = lang || 'az';
        const brands = await this.brandRepository
            .createQueryBuilder('brand')
            .where("(brand.name->>'az' ILIKE :search OR brand.name->>'en' ILIKE :search OR brand.name->>'ru' ILIKE :search)", { search: `%${name}%` })
            .andWhere('brand.isActive = :isActive', { isActive: true })
            .orderBy('brand.id', 'ASC')
            .getMany();
        return brands.map((brand) => ({
            ...brand,
            name: this.i18n.translateField(brand.name, lang),
        }));
    }
    async searchByNameForAdmin(name) {
        return await this.brandRepository
            .createQueryBuilder('brand')
            .where("(brand.name->>'az' ILIKE :search OR brand.name->>'en' ILIKE :search OR brand.name->>'ru' ILIKE :search)", { search: `%${name}%` })
            .orderBy('brand.id', 'ASC')
            .getMany();
    }
    async getStats() {
        const [total, active] = await Promise.all([
            this.brandRepository.count(),
            this.brandRepository.count({ where: { isActive: true } }),
        ]);
        return {
            total,
            active,
            inactive: total - active,
        };
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(brand_entity_1.Brand)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        i18n_service_1.I18nService])
], BrandService);
//# sourceMappingURL=brand.service.js.map