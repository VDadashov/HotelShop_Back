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
exports.TestimonialService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const testimonial_entity_1 = require("../_common/entities/testimonial.entity");
const i18n_service_1 = require("../i18n/i18n.service");
let TestimonialService = class TestimonialService {
    testimonialRepository;
    i18n;
    constructor(testimonialRepository, i18n) {
        this.testimonialRepository = testimonialRepository;
        this.i18n = i18n;
    }
    async create(createTestimonialDto) {
        const testimonial = this.testimonialRepository.create({
            name: createTestimonialDto.name,
            message: createTestimonialDto.message,
            imageUrl: createTestimonialDto.imageUrl,
            isActive: createTestimonialDto.isActive ?? true,
            rating: createTestimonialDto.rating ?? 5,
        });
        return await this.testimonialRepository.save(testimonial);
    }
    async getAll(lang) {
        lang = lang || 'az';
        const testimonials = await this.testimonialRepository.find({
            order: {
                id: 'DESC',
            },
        });
        return testimonials.map((testimonial) => ({
            ...testimonial,
            name: this.i18n.translateField(testimonial.name, lang),
            message: this.i18n.translateField(testimonial.message, lang),
        }));
    }
    async getAllForAdmin() {
        return await this.testimonialRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }
    async findAll(queryDto = {}, lang) {
        lang = lang || 'az';
        const { page = 1, pageSize = 10, isActive, search, minRating, sort = 'newest', } = queryDto;
        const skip = (page - 1) * pageSize;
        const queryBuilder = this.testimonialRepository.createQueryBuilder('testimonial');
        if (isActive !== undefined) {
            queryBuilder.andWhere('testimonial.isActive = :isActive', { isActive });
        }
        if (minRating !== undefined) {
            queryBuilder.andWhere('testimonial.rating >= :minRating', { minRating });
        }
        if (search && search.trim() !== '') {
            const searchTerm = `%${search.trim().toLowerCase()}%`;
            queryBuilder.andWhere(`(
          LOWER(testimonial.name->>'az') LIKE LOWER(:search) OR 
          LOWER(testimonial.name->>'en') LIKE LOWER(:search) OR 
          LOWER(testimonial.name->>'ru') LIKE LOWER(:search) OR
          LOWER(testimonial.message->>'az') LIKE LOWER(:search) OR 
          LOWER(testimonial.message->>'en') LIKE LOWER(:search) OR 
          LOWER(testimonial.message->>'ru') LIKE LOWER(:search)
        )`, { search: searchTerm });
        }
        switch (sort) {
            case 'newest':
                queryBuilder.orderBy('testimonial.createdAt', 'DESC');
                break;
            case 'oldest':
                queryBuilder.orderBy('testimonial.createdAt', 'ASC');
                break;
            case 'name-az':
                queryBuilder.orderBy("testimonial.name->>'az'", 'ASC');
                break;
            case 'name-za':
                queryBuilder.orderBy("testimonial.name->>'az'", 'DESC');
                break;
            case 'rating-high':
                queryBuilder.orderBy('testimonial.rating', 'DESC');
                break;
            case 'rating-low':
                queryBuilder.orderBy('testimonial.rating', 'ASC');
                break;
            default:
                queryBuilder.orderBy('testimonial.id', 'DESC');
        }
        queryBuilder.skip(skip).take(pageSize);
        const [data, total] = await queryBuilder.getManyAndCount();
        const translatedData = data.map((testimonial) => ({
            ...testimonial,
            name: this.i18n.translateField(testimonial.name, lang),
            message: this.i18n.translateField(testimonial.message, lang),
        }));
        return {
            data: translatedData,
            pagination: {
                totalItems: total,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
                pageSize,
            },
        };
    }
    async findAllForAdmin(queryDto = {}) {
        const { page = 1, pageSize = 10, isActive, search, minRating, sort = 'newest', } = queryDto;
        const skip = (page - 1) * pageSize;
        const queryBuilder = this.testimonialRepository.createQueryBuilder('testimonial');
        if (isActive !== undefined) {
            queryBuilder.andWhere('testimonial.isActive = :isActive', { isActive });
        }
        if (minRating !== undefined) {
            queryBuilder.andWhere('testimonial.rating >= :minRating', { minRating });
        }
        if (search && search.trim() !== '') {
            const searchTerm = `%${search.trim().toLowerCase()}%`;
            queryBuilder.andWhere(`(
          LOWER(testimonial.name->>'az') LIKE LOWER(:search) OR 
          LOWER(testimonial.name->>'en') LIKE LOWER(:search) OR 
          LOWER(testimonial.name->>'ru') LIKE LOWER(:search) OR
          LOWER(testimonial.message->>'az') LIKE LOWER(:search) OR 
          LOWER(testimonial.message->>'en') LIKE LOWER(:search) OR 
          LOWER(testimonial.message->>'ru') LIKE LOWER(:search)
        )`, { search: searchTerm });
        }
        switch (sort) {
            case 'newest':
                queryBuilder.orderBy('testimonial.createdAt', 'DESC');
                break;
            case 'oldest':
                queryBuilder.orderBy('testimonial.createdAt', 'ASC');
                break;
            case 'name-az':
                queryBuilder.orderBy("testimonial.name->>'az'", 'ASC');
                break;
            case 'name-za':
                queryBuilder.orderBy("testimonial.name->>'az'", 'DESC');
                break;
            case 'rating-high':
                queryBuilder.orderBy('testimonial.rating', 'DESC');
                break;
            case 'rating-low':
                queryBuilder.orderBy('testimonial.rating', 'ASC');
                break;
            default:
                queryBuilder.orderBy('testimonial.id', 'DESC');
        }
        queryBuilder.skip(skip).take(pageSize);
        const [data, total] = await queryBuilder.getManyAndCount();
        return {
            data,
            pagination: {
                totalItems: total,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
                pageSize,
            },
        };
    }
    async findOne(id, lang) {
        lang = lang || 'az';
        const testimonial = await this.testimonialRepository.findOne({
            where: { id },
        });
        if (!testimonial) {
            throw new common_1.NotFoundException(`ID ${id} olan testimonial tapılmadı`);
        }
        return {
            ...testimonial,
            name: this.i18n.translateField(testimonial.name, lang),
            message: this.i18n.translateField(testimonial.message, lang),
        };
    }
    async findOneForAdmin(id) {
        const testimonial = await this.testimonialRepository.findOne({
            where: { id },
        });
        if (!testimonial) {
            throw new common_1.NotFoundException(`ID ${id} olan testimonial tapılmadı`);
        }
        return testimonial;
    }
    async update(id, updateTestimonialDto) {
        const testimonial = await this.findOneForAdmin(id);
        Object.assign(testimonial, updateTestimonialDto);
        return await this.testimonialRepository.save(testimonial);
    }
    async remove(id) {
        const testimonial = await this.findOneForAdmin(id);
        await this.testimonialRepository.remove(testimonial);
    }
    async getActiveTestimonials(lang) {
        lang = lang || 'az';
        const testimonials = await this.testimonialRepository.find({
            where: { isActive: true },
            order: { id: 'DESC' },
        });
        return testimonials.map((testimonial) => ({
            ...testimonial,
            name: this.i18n.translateField(testimonial.name, lang),
            message: this.i18n.translateField(testimonial.message, lang),
        }));
    }
    async getActiveTestimonialsForAdmin() {
        return await this.testimonialRepository.find({
            where: { isActive: true },
            order: { id: 'DESC' },
        });
    }
};
exports.TestimonialService = TestimonialService;
exports.TestimonialService = TestimonialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(testimonial_entity_1.Testimonial)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        i18n_service_1.I18nService])
], TestimonialService);
//# sourceMappingURL=testimonial.service.js.map