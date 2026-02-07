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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
const typeorm_1 = require("typeorm");
const page_entity_1 = require("./page.entity");
const common_types_1 = require("../classes/common-types");
let Section = class Section extends typeorm_1.BaseEntity {
    id;
    name;
    title;
    description;
    media;
    additionalData;
    order;
    type;
    pageId;
    isActive;
    visibility;
    createdAt;
    updatedAt;
    page;
};
exports.Section = Section;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Section.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Section.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", common_types_1.MultiLanguageText)
], Section.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", common_types_1.MultiLanguageText)
], Section.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Section.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Section.prototype, "additionalData", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Section.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'content' }),
    __metadata("design:type", String)
], Section.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'page_id' }),
    __metadata("design:type", Number)
], Section.prototype, "pageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Section.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, default: 'both' }),
    __metadata("design:type", String)
], Section.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Section.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Section.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => page_entity_1.Page, (page) => page.sections, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'page_id' }),
    __metadata("design:type", page_entity_1.Page)
], Section.prototype, "page", void 0);
exports.Section = Section = __decorate([
    (0, typeorm_1.Entity)('sections')
], Section);
//# sourceMappingURL=section.entity.js.map