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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../_common/entities/category.entity");
const i18n_service_1 = require("../i18n/i18n.service");
const slugify_util_1 = require("../_common/utils/slugify.util");
let CategoryService = class CategoryService {
    categoryRepository;
    i18n;
    constructor(categoryRepository, i18n) {
        this.categoryRepository = categoryRepository;
        this.i18n = i18n;
    }
    buildMenuTree(categories, parentId = null, parentPath = '', lang) {
        return categories
            .filter((cat) => cat.parentId === parentId)
            .map((cat) => {
            const name = typeof cat.name === 'string'
                ? cat.name
                : this.i18n.translateField(cat.name, lang || 'az');
            const fullPath = parentPath
                ? `${parentPath}/${(0, slugify_util_1.slugify)(name)}`
                : `/${(0, slugify_util_1.slugify)(name)}`;
            const children = this.buildMenuTree(categories, cat.id, fullPath, lang);
            const MenuItemDto = {
                id: cat.id,
                title: `•${name}`,
                url: fullPath,
            };
            if (children.length > 0) {
                MenuItemDto.children = children;
            }
            return MenuItemDto;
        });
    }
    getLanguageFromHeader(acceptLanguage) {
        if (!acceptLanguage) {
            return 'az';
        }
        const lang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
        const supportedLanguages = ['az', 'en', 'ru'];
        return supportedLanguages.includes(lang) ? lang : 'az';
    }
    async getMenu(acceptLanguage) {
        const lang = this.getLanguageFromHeader(acceptLanguage);
        const categories = await this.categoryRepository.find({
            where: { isActive: true },
            order: { index: 'ASC' },
        });
        return this.buildMenuTree(categories, null, '', lang);
    }
    async create(createCategoryDto) {
        let level = 1;
        let parent = null;
        if (createCategoryDto.parentId) {
            parent = await this.categoryRepository.findOne({
                where: { id: createCategoryDto.parentId },
            });
            if (!parent) {
                throw new common_1.NotFoundException('Parent kateqoriya tapılmadı');
            }
            if (!parent.isActive) {
                throw new common_1.BadRequestException('Deaktiv kateqoriyanın alt kateqoriyası yaradıla bilməz');
            }
            level = parent.level + 1;
            if (level > 5) {
                throw new common_1.BadRequestException('Maximum 5 səviyyə kateqoriya yaradıla bilər');
            }
        }
        const existingCategory = await this.categoryRepository.findOne({
            where: {
                parentId: createCategoryDto.parentId || (0, typeorm_2.IsNull)(),
            },
        });
        let maxIndex = 0;
        if (createCategoryDto.parentId) {
            const lastCategory = await this.categoryRepository.findOne({
                where: { parentId: createCategoryDto.parentId },
                order: { index: 'DESC' },
            });
            maxIndex = lastCategory ? lastCategory.index + 1 : 0;
        }
        else {
            const lastRootCategory = await this.categoryRepository.findOne({
                where: { parentId: (0, typeorm_2.IsNull)() },
                order: { index: 'DESC' },
            });
            maxIndex = lastRootCategory ? lastRootCategory.index + 1 : 0;
        }
        const category = this.categoryRepository.create({
            name: createCategoryDto.name,
            index: createCategoryDto.index ?? maxIndex,
            isActive: createCategoryDto.isActive,
            isProductHolder: createCategoryDto.isProductHolder,
            parentId: createCategoryDto.parentId,
            level,
        });
        return await this.categoryRepository.save(category);
    }
    async getAll(lang, isActive) {
        lang = lang || 'az';
        const whereCondition = {};
        if (isActive !== undefined) {
            whereCondition.isActive = isActive;
        }
        const categories = await this.categoryRepository.find({
            where: whereCondition,
            relations: ['parent', 'children'],
            order: {
                level: 'ASC',
                id: 'ASC',
            },
        });
        return categories.map((category) => ({
            ...category,
            name: this.i18n.translateField(category.name, lang),
            parent: category.parent
                ? {
                    ...category.parent,
                    name: this.i18n.translateField(category.parent.name, lang),
                }
                : null,
            children: category.children
                ? category.children.map((child) => ({
                    ...child,
                    name: this.i18n.translateField(child.name, lang),
                }))
                : [],
        }));
    }
    async getAllForAdmin(isActive) {
        const whereCondition = {};
        if (isActive !== undefined) {
            whereCondition.isActive = isActive;
        }
        return await this.categoryRepository.find({
            where: whereCondition,
            relations: ['parent', 'children'],
            order: {
                level: 'ASC',
                id: 'ASC',
            },
        });
    }
    async findAll(queryDto = {}, lang) {
        lang = lang || 'az';
        const { page = 1, pageSize = 10, isActive, parentId = undefined, level = undefined, search, } = queryDto;
        const skip = (page - 1) * pageSize;
        const queryBuilder = this.categoryRepository
            .createQueryBuilder('category')
            .leftJoinAndSelect('category.parent', 'parent')
            .leftJoinAndSelect('category.children', 'children');
        if (isActive !== undefined) {
            queryBuilder.andWhere('category.isActive = :isActive', { isActive });
        }
        if (parentId !== undefined) {
            if (parentId === null) {
                queryBuilder.andWhere('category.parentId IS NULL');
            }
            else {
                queryBuilder.andWhere('category.parentId = :parentId', { parentId });
            }
        }
        if (level !== undefined) {
            queryBuilder.andWhere('category.level = :level', { level });
        }
        if (search && search.trim() !== '') {
            const searchTerm = `%${search.trim().toLowerCase()}%`;
            queryBuilder.andWhere(`(
        LOWER(category.name->>'az') LIKE LOWER(:search) OR 
        LOWER(category.name->>'en') LIKE LOWER(:search) OR 
        LOWER(category.name->>'ru') LIKE LOWER(:search)
      )`, { search: searchTerm });
        }
        queryBuilder
            .orderBy('category.level', 'ASC')
            .addOrderBy('category.id', 'ASC')
            .skip(skip)
            .take(pageSize);
        const [data, total] = await queryBuilder.getManyAndCount();
        const translatedData = data.map((category) => ({
            ...category,
            name: this.i18n.translateField(category.name, lang),
            parent: category.parent
                ? {
                    ...category.parent,
                    name: this.i18n.translateField(category.parent.name, lang),
                }
                : null,
            children: category.children
                ? category.children.map((child) => ({
                    ...child,
                    name: this.i18n.translateField(child.name, lang),
                }))
                : [],
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
        const { page = 1, pageSize = 10, isActive, parentId = undefined, level = undefined, search, } = queryDto;
        const skip = (page - 1) * pageSize;
        const queryBuilder = this.categoryRepository
            .createQueryBuilder('category')
            .leftJoinAndSelect('category.parent', 'parent')
            .leftJoinAndSelect('category.children', 'children');
        if (isActive !== undefined) {
            queryBuilder.andWhere('category.isActive = :isActive', { isActive });
        }
        if (parentId !== undefined) {
            if (parentId === null) {
                queryBuilder.andWhere('category.parentId IS NULL');
            }
            else {
                queryBuilder.andWhere('category.parentId = :parentId', { parentId });
            }
        }
        if (level !== undefined) {
            queryBuilder.andWhere('category.level = :level', { level });
        }
        if (search) {
            queryBuilder.andWhere('(category.name->>"$.az" LIKE :search OR category.name->>"$.en" LIKE :search OR category.name->>"$.ru" LIKE :search)', { search: `%${search}%` });
        }
        queryBuilder
            .orderBy('category.level', 'ASC')
            .addOrderBy('category.id', 'ASC')
            .skip(skip)
            .take(pageSize);
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
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['parent', 'children', 'products'],
        });
        if (!category) {
            throw new common_1.NotFoundException(`ID ${id} olan kateqoriya tapılmadı`);
        }
        return {
            ...category,
            name: this.i18n.translateField(category.name, lang),
            parent: category.parent
                ? {
                    ...category.parent,
                    name: this.i18n.translateField(category.parent.name, lang),
                }
                : null,
            children: category.children
                ? category.children.map((child) => ({
                    ...child,
                    name: this.i18n.translateField(child.name, lang),
                }))
                : [],
        };
    }
    async findOneForAdmin(id) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['parent', 'children', 'products'],
        });
        if (!category) {
            throw new common_1.NotFoundException(`ID ${id} olan kateqoriya tapılmadı`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOneForAdmin(id);
        let level = category.level;
        const hasParentId = Object.prototype.hasOwnProperty.call(updateCategoryDto, 'parentId');
        if (hasParentId &&
            updateCategoryDto.parentId !== category.parentId) {
            if (updateCategoryDto.parentId === id) {
                throw new common_1.BadRequestException('Kateqoriya özünün parent-i ola bilməz');
            }
            if (updateCategoryDto.parentId) {
                const newParent = await this.categoryRepository.findOne({
                    where: { id: updateCategoryDto.parentId },
                });
                if (!newParent) {
                    throw new common_1.NotFoundException('Yeni parent kateqoriya tapılmadı');
                }
                const isChildOfCurrent = await this.isChildOfCategory(id, updateCategoryDto.parentId);
                if (isChildOfCurrent) {
                    throw new common_1.BadRequestException('Alt kateqoriyanı parent kimi təyin etmək mümkün deyil');
                }
                level = newParent.level + 1;
                category.parent = newParent;
                category.parentId = newParent.id;
            }
            else {
                level = 1;
                category.parent = null;
                category.parentId = null;
            }
            await this.updateChildrenLevels(id, level);
        }
        const { parentId, ...rest } = updateCategoryDto;
        Object.assign(category, rest, { level });
        return await this.categoryRepository.save(category);
    }
    async remove(id) {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });
        if (!category) {
            throw new common_1.BadRequestException('Kateqoriya tapılmadı');
        }
        const childrenCount = await this.categoryRepository.count({
            where: { parentId: id },
        });
        if (childrenCount > 0) {
            throw new common_1.BadRequestException('Alt kateqoriyaları olan kateqoriya silinə bilməz');
        }
        await this.categoryRepository.delete(id);
    }
    async getRootCategories(lang) {
        lang = lang || 'az';
        const categories = await this.categoryRepository.find({
            where: { level: 1, isActive: true },
            relations: ['children'],
            order: { id: 'ASC' },
        });
        return categories.map((category) => ({
            ...category,
            name: this.i18n.translateField(category.name, lang),
            children: category.children
                ? category.children.map((child) => ({
                    ...child,
                    name: this.i18n.translateField(child.name, lang),
                }))
                : [],
        }));
    }
    async getRootCategoriesForAdmin() {
        return await this.categoryRepository.find({
            where: { level: 1, isActive: true },
            relations: ['children'],
            order: { id: 'ASC' },
        });
    }
    async getCategoryTree(lang) {
        lang = lang || 'az';
        const categories = await this.categoryRepository.find({
            where: { isActive: true },
            relations: ['children', 'parent'],
            order: { level: 'ASC', id: 'ASC' },
        });
        const translatedCategories = categories.map((category) => ({
            ...category,
            name: this.i18n.translateField(category.name, lang),
        }));
        return this.buildTree(translatedCategories);
    }
    async getCategoryTreeForAdmin() {
        const categories = await this.categoryRepository.find({
            where: { isActive: true },
            relations: ['children', 'parent'],
            order: { level: 'ASC', id: 'ASC' },
        });
        return this.buildTree(categories);
    }
    async getProductHolderCategories(lang) {
        lang = lang || 'az';
        const categories = await this.categoryRepository.find({
            where: { isProductHolder: true, isActive: true },
            order: { level: 'ASC', id: 'ASC' },
        });
        return categories.map((category) => ({
            ...category,
            name: this.i18n.translateField(category.name, lang),
        }));
    }
    async getProductHolderCategoriesForAdmin() {
        return await this.categoryRepository.find({
            where: { isProductHolder: true, isActive: true },
            order: { level: 'ASC', id: 'ASC' },
        });
    }
    async isChildOfCategory(parentId, childId) {
        const child = await this.categoryRepository.findOne({
            where: { id: childId },
            relations: ['parent'],
        });
        if (!child || !child.parent) {
            return false;
        }
        if (child.parent.id === parentId) {
            return true;
        }
        return await this.isChildOfCategory(parentId, child.parent.id);
    }
    async updateChildrenLevels(parentId, newParentLevel) {
        const children = await this.categoryRepository.find({
            where: { parentId },
        });
        for (const child of children) {
            child.level = newParentLevel + 1;
            await this.categoryRepository.save(child);
            await this.updateChildrenLevels(child.id, child.level);
        }
    }
    buildTree(categories, parentId = null) {
        return categories
            .filter((category) => category.parentId === parentId)
            .map((category) => ({
            ...category,
            children: this.buildTree(categories, category.id),
        }));
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        i18n_service_1.I18nService])
], CategoryService);
//# sourceMappingURL=category.service.js.map