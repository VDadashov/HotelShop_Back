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
exports.SectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const section_entity_1 = require("../_common/entities/section.entity");
const page_entity_1 = require("../_common/entities/page.entity");
let SectionService = class SectionService {
    sectionRepository;
    pageRepository;
    constructor(sectionRepository, pageRepository) {
        this.sectionRepository = sectionRepository;
        this.pageRepository = pageRepository;
    }
    async create(createSectionDto) {
        try {
            const page = await this.pageRepository.findOne({
                where: { id: createSectionDto.pageId },
            });
            if (!page) {
                throw new common_1.NotFoundException('Göstərilən page tapılmadı');
            }
            if (createSectionDto.order === undefined) {
                const lastSection = await this.sectionRepository.findOne({
                    where: { pageId: createSectionDto.pageId },
                    order: { order: 'DESC' },
                });
                createSectionDto.order = lastSection ? lastSection.order + 1 : 0;
            }
            const sectionData = {
                ...createSectionDto,
                media: createSectionDto.media || null,
                additionalData: createSectionDto.additionalData || null,
            };
            const section = this.sectionRepository.create(sectionData);
            const savedSection = await this.sectionRepository.save(section);
            return savedSection;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.name === 'ValidationError' ||
                error.response?.statusCode === 400) {
                throw new common_1.BadRequestException({
                    message: error.response?.message || error.message || 'Validation failed',
                    details: error.response?.details || null,
                });
            }
            throw new common_1.BadRequestException('Section yaradılarkən xəta baş verdi');
        }
    }
    async findAllWithSelectedLanguage(pageId, type, acceptLanguage = 'az') {
        try {
            const where = { isActive: true };
            if (pageId) {
                where.pageId = pageId;
            }
            if (type) {
                where.type = type;
            }
            const sections = await this.sectionRepository.find({
                where,
                order: { order: 'ASC', createdAt: 'DESC' },
            });
            const filteredSections = sections.map((section) => ({
                id: section.id,
                name: section.name,
                type: section.type,
                order: section.order,
                pageId: section.pageId,
                isActive: section.isActive,
                createdAt: section.createdAt,
                updatedAt: section.updatedAt,
                title: section.title?.[acceptLanguage] || '',
                description: section.description?.[acceptLanguage] || '',
                media: section.media
                    ? {
                        ...section.media,
                        alt: section.media.alt?.[acceptLanguage] || '',
                    }
                    : section.media,
                additionalData: section.additionalData
                    ? this.filterAdditionalDataForLanguage(section.additionalData, acceptLanguage)
                    : section.additionalData,
            }));
            return filteredSections;
        }
        catch (error) {
            throw error;
        }
    }
    filterAdditionalDataForLanguage(additionalData, language) {
        const filtered = { ...additionalData };
        Object.keys(filtered).forEach((key) => {
            if (filtered[key] &&
                typeof filtered[key] === 'object' &&
                filtered[key].hasOwnProperty(language)) {
                filtered[key] = filtered[key][language];
            }
        });
        return filtered;
    }
    async findAllForAdmin() {
        try {
            const sections = await this.sectionRepository.find({
                order: { order: 'ASC', createdAt: 'DESC' },
            });
            return sections;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        const section = await this.sectionRepository.findOne({ where: { id } });
        if (!section) {
            throw new common_1.NotFoundException(`Section with id ${id} not found`);
        }
        return section;
    }
    async update(id, updateSectionDto) {
        const section = await this.findOne(id);
        Object.assign(section, updateSectionDto);
        return await this.sectionRepository.save(section);
    }
    async remove(id) {
        const result = await this.sectionRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Section with id ${id} not found`);
        }
    }
};
exports.SectionService = SectionService;
exports.SectionService = SectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __param(1, (0, typeorm_1.InjectRepository)(page_entity_1.Page)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SectionService);
//# sourceMappingURL=section.service.js.map