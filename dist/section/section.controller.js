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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const section_service_1 = require("./section.service");
const create_section_dto_1 = require("./dto/create-section.dto");
const update_section_dto_1 = require("./dto/update-section.dto");
const section_entity_1 = require("../_common/entities/section.entity");
let SectionController = class SectionController {
    sectionService;
    constructor(sectionService) {
        this.sectionService = sectionService;
    }
    async create(createSectionDto) {
        return this.sectionService.create(createSectionDto);
    }
    async findAll(pageId, type, allLanguages, acceptLanguage) {
        if (allLanguages) {
            return await this.sectionService.findAllForAdmin();
        }
        return this.sectionService.findAllWithSelectedLanguage(pageId ? Number(pageId) : undefined, type, acceptLanguage);
    }
    async findOne(id) {
        return this.sectionService.findOne(id);
    }
    async update(id, updateSectionDto) {
        return this.sectionService.update(id, updateSectionDto);
    }
    async remove(id) {
        return this.sectionService.remove(id);
    }
};
exports.SectionController = SectionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Yeni section yarat' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: section_entity_1.Section }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_section_dto_1.CreateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Bütün section-ları gətir (müxtəlif filterlər ilə)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'pageId',
        required: false,
        type: Number,
        description: 'Müəyyən page-ə aid section-lar',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        required: false,
        type: String,
        description: 'Section tipinə görə filter (məs: header, footer, hero)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [section_entity_1.Section] }),
    __param(0, (0, common_1.Query)('pageId')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('allLanguages')),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ID ilə section tap' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: section_entity_1.Section }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Section yenilə' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: section_entity_1.Section }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_section_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Section sil' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Uğurla silindi' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "remove", null);
exports.SectionController = SectionController = __decorate([
    (0, swagger_1.ApiTags)('Sections'),
    (0, common_1.Controller)('sections'),
    __metadata("design:paramtypes", [section_service_1.SectionService])
], SectionController);
//# sourceMappingURL=section.controller.js.map