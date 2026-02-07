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
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const faq_entity_1 = require("../_common/entities/faq.entity");
const i18n_service_1 = require("../i18n/i18n.service");
let FaqService = class FaqService {
    faqRepository;
    i18n;
    constructor(faqRepository, i18n) {
        this.faqRepository = faqRepository;
        this.i18n = i18n;
    }
    async create(createFaqDto) {
        const faq = new faq_entity_1.Faq();
        faq.question = createFaqDto.question;
        faq.answer = createFaqDto.answer;
        faq.isActive = createFaqDto.isActive ?? true;
        return await this.faqRepository.save(faq);
    }
    async getAll(lang) {
        lang = lang || 'az';
        const faqs = await this.faqRepository.find({
            where: { isActive: true },
            order: {
                id: 'DESC',
            },
        });
        return faqs.map((faq) => ({
            ...faq,
            question: this.i18n.translateField(faq.question, lang),
            answer: this.i18n.translateField(faq.answer, lang),
        }));
    }
    async getAllForAdmin() {
        return await this.faqRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }
    async findAll(queryDto = {}, lang, isActive) {
        lang = lang || 'az';
        const page = queryDto.page || 1;
        const limit = queryDto.limit || 10;
        const { search, lang: searchLang } = queryDto;
        const skip = (page - 1) * limit;
        const queryBuilder = this.faqRepository.createQueryBuilder('faq');
        if (isActive !== undefined) {
            queryBuilder.andWhere('faq.isActive = :isActive', { isActive });
        }
        if (search && search.trim() !== '') {
            const searchTerm = `%${search.trim().toLowerCase()}%`;
            if (searchLang) {
                queryBuilder.andWhere(`(
          LOWER(faq.question->>'${searchLang}') LIKE LOWER(:search) OR 
          LOWER(faq.answer->>'${searchLang}') LIKE LOWER(:search)
        )`, { search: searchTerm });
            }
            else {
                queryBuilder.andWhere(`(
          LOWER(faq.question->>'az') LIKE LOWER(:search) OR 
          LOWER(faq.question->>'en') LIKE LOWER(:search) OR 
          LOWER(faq.question->>'ru') LIKE LOWER(:search) OR
          LOWER(faq.answer->>'az') LIKE LOWER(:search) OR 
          LOWER(faq.answer->>'en') LIKE LOWER(:search) OR 
          LOWER(faq.answer->>'ru') LIKE LOWER(:search)
        )`, { search: searchTerm });
            }
        }
        queryBuilder.addOrderBy('faq.id', 'DESC').skip(skip).take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();
        const translatedData = data.map((faq) => ({
            ...faq,
            question: this.i18n.translateField(faq.question, lang),
            answer: this.i18n.translateField(faq.answer, lang),
        }));
        return {
            data: translatedData,
            total,
            page,
            limit,
        };
    }
    async findAllForAdmin(queryDto = {}) {
        const page = queryDto.page || 1;
        const limit = queryDto.limit || 10;
        const { isActive, search, lang: searchLang } = queryDto;
        const skip = (page - 1) * limit;
        const queryBuilder = this.faqRepository.createQueryBuilder('faq');
        if (isActive !== undefined) {
            queryBuilder.andWhere('faq.isActive = :isActive', { isActive });
        }
        if (search && search.trim() !== '') {
            const searchTerm = `%${search.trim().toLowerCase()}%`;
            if (searchLang) {
                queryBuilder.andWhere(`(
            LOWER(faq.question->>'${searchLang}') LIKE LOWER(:search) OR 
            LOWER(faq.answer->>'${searchLang}') LIKE LOWER(:search)
          )`, { search: searchTerm });
            }
            else {
                queryBuilder.andWhere(`(
            LOWER(faq.question->>'az') LIKE LOWER(:search) OR 
            LOWER(faq.question->>'en') LIKE LOWER(:search) OR 
            LOWER(faq.question->>'ru') LIKE LOWER(:search) OR
            LOWER(faq.answer->>'az') LIKE LOWER(:search) OR 
            LOWER(faq.answer->>'en') LIKE LOWER(:search) OR 
            LOWER(faq.answer->>'ru') LIKE LOWER(:search)
          )`, { search: searchTerm });
            }
        }
        queryBuilder.addOrderBy('faq.id', 'DESC').skip(skip).take(limit);
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
        const faq = await this.faqRepository.findOne({
            where: { id },
        });
        if (!faq) {
            throw new common_1.NotFoundException(`ID ${id} olan FAQ tapılmadı`);
        }
        return {
            ...faq,
            question: this.i18n.translateField(faq.question, lang),
            answer: this.i18n.translateField(faq.answer, lang),
        };
    }
    async findOneForAdmin(id) {
        const faq = await this.faqRepository.findOne({
            where: { id },
        });
        if (!faq) {
            throw new common_1.NotFoundException(`ID ${id} olan FAQ tapılmadı`);
        }
        return faq;
    }
    async update(id, updateFaqDto) {
        const faq = await this.findOneForAdmin(id);
        Object.assign(faq, updateFaqDto);
        return await this.faqRepository.save(faq);
    }
    async remove(id) {
        const faq = await this.findOneForAdmin(id);
        await this.faqRepository.remove(faq);
    }
};
exports.FaqService = FaqService;
exports.FaqService = FaqService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(faq_entity_1.Faq)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        i18n_service_1.I18nService])
], FaqService);
//# sourceMappingURL=faq.service.js.map