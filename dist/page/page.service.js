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
exports.PageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const page_entity_1 = require("../_common/entities/page.entity");
const i18n_service_1 = require("../i18n/i18n.service");
let PageService = class PageService {
    pageRepo;
    i18n;
    constructor(pageRepo, i18n) {
        this.pageRepo = pageRepo;
        this.i18n = i18n;
    }
    async create(createPageDto) {
        const page = this.pageRepo.create(createPageDto);
        page.slug =
            createPageDto.title && createPageDto.title.az
                ? this.slugify(createPageDto.title.az)
                : '';
        return await this.pageRepo.save(page);
    }
    async findAll(lang) {
        lang = lang || 'az';
        const pages = await this.pageRepo.find({
            where: { isActive: true },
            order: { id: 'DESC' },
        });
        return pages.map((page) => ({
            id: page.id,
            title: this.getTranslatedField(page.title, lang),
            slug: page.slug,
            isActive: page.isActive,
        }));
    }
    async findOne(id, lang) {
        lang = lang || 'az';
        const page = await this.pageRepo.findOne({
            where: { id, isActive: true },
        });
        if (!page) {
            throw new common_1.NotFoundException(`Page with ID ${id} not found`);
        }
        return {
            id: page.id,
            title: this.getTranslatedField(page.title, lang),
            slug: page.slug,
            isActive: page.isActive,
        };
    }
    async update(id, updatePageDto) {
        const page = await this.pageRepo.findOne({ where: { id } });
        if (!page) {
            throw new common_1.NotFoundException(`Page with ID ${id} not found`);
        }
        if (updatePageDto.title) {
            page.title = {
                ...page.title,
                ...updatePageDto.title,
            };
        }
        if (updatePageDto.isActive !== undefined) {
            page.isActive = updatePageDto.isActive;
        }
        return await this.pageRepo.save(page);
    }
    async remove(id) {
        const page = await this.pageRepo.findOne({ where: { id } });
        if (!page) {
            throw new common_1.NotFoundException(`Page with ID ${id} not found`);
        }
        await this.pageRepo.remove(page);
        return { deleted: true, message: 'Page successfully deleted' };
    }
    async findAllForAdmin() {
        const pages = await this.pageRepo.find({
            order: { id: 'DESC' },
        });
        return pages.map((page) => ({
            id: page.id,
            title: page.title,
            slug: page.slug,
            isActive: page.isActive,
            titleAz: page.title?.az || '',
            titleEn: page.title?.en || '',
            titleRu: page.title?.ru || '',
        }));
    }
    async findOneForAdmin(id) {
        const page = await this.pageRepo.findOne({ where: { id } });
        if (!page) {
            throw new common_1.NotFoundException(`Page with ID ${id} not found`);
        }
        return {
            id: page.id,
            title: page.title,
            slug: page.slug,
            isActive: page.isActive,
            titleAz: page.title?.az || '',
            titleEn: page.title?.en || '',
            titleRu: page.title?.ru || '',
        };
    }
    async checkTitleExists(title, lang, excludeId) {
        const queryBuilder = this.pageRepo.createQueryBuilder('page');
        queryBuilder.where(`page.title ->> :lang = :title`, {
            lang,
            title,
        });
        if (excludeId) {
            queryBuilder.andWhere('page.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    getTranslatedField(field, lang) {
        if (!field)
            return '';
        switch (lang) {
            case 'az':
                return field.az || '';
            case 'en':
                return field.en || field.az || '';
            case 'ru':
                return field.ru || field.az || '';
            default:
                return field.az || '';
        }
    }
    async updateTitle(id, titleData) {
        const page = await this.pageRepo.findOne({ where: { id } });
        if (!page) {
            throw new common_1.NotFoundException(`Page with ID ${id} not found`);
        }
        page.title = {
            ...page.title,
            ...titleData,
        };
        return await this.pageRepo.save(page);
    }
    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9əıöüçğş\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
};
exports.PageService = PageService;
exports.PageService = PageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(page_entity_1.Page)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        i18n_service_1.I18nService])
], PageService);
//# sourceMappingURL=page.service.js.map