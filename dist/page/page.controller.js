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
exports.PageController = void 0;
const common_1 = require("@nestjs/common");
const page_service_1 = require("./page.service");
const create_page_dto_1 = require("./dto/create-page.dto");
const update_page_dto_1 = require("./dto/update-page.dto");
const jwt_auth_guard_1 = require("../_common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../_common/guards/roles.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
let PageController = class PageController {
    pageService;
    constructor(pageService) {
        this.pageService = pageService;
    }
    async findAll(allLanguages, acceptLanguage) {
        if (allLanguages) {
            return await this.pageService.findAllForAdmin();
        }
        return await this.pageService.findAll(acceptLanguage);
    }
    async findOne(id, allLanguages, acceptLanguage) {
        if (allLanguages) {
            return await this.pageService.findOneForAdmin(id);
        }
        return await this.pageService.findOne(id, acceptLanguage);
    }
    async create(dto) {
        return this.pageService.create(dto);
    }
    async update(id, updatePageDto) {
        const page = await this.pageService.update(id, updatePageDto);
        return {
            success: true,
            message: 'Page successfully updated',
            data: page,
        };
    }
    async remove(id) {
        return await this.pageService.remove(id);
    }
};
exports.PageController = PageController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active pages' }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of active pages',
    }),
    __param(0, (0, common_1.Query)('allLanguages')),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get page by ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'allLanguages',
        required: false,
        type: Boolean,
        description: 'Admin üçün bütün dillər',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('allLanguages')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new page' }),
    (0, swagger_1.ApiBody)({
        type: create_page_dto_1.CreatePageDto,
        examples: {
            example1: {
                summary: 'Create Home Page',
                value: {
                    title: {
                        az: 'Ana Səhifə',
                        en: 'Home Page',
                        ru: 'Главная страница',
                    },
                    isActive: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Page created successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_page_dto_1.CreatePageDto]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update page' }),
    (0, swagger_1.ApiBody)({ type: update_page_dto_1.UpdatePageDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_page_dto_1.UpdatePageDto]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete page' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Page deleted successfully',
        schema: {
            type: 'object',
            properties: {
                deleted: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Page successfully deleted' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "remove", null);
exports.PageController = PageController = __decorate([
    (0, swagger_1.ApiTags)('Pages'),
    (0, common_1.Controller)('pages'),
    __metadata("design:paramtypes", [page_service_1.PageService])
], PageController);
//# sourceMappingURL=page.controller.js.map