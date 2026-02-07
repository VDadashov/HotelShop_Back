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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const base_entity_1 = require("./_base/base.entity");
let Category = class Category extends base_entity_1.BaseEntity {
    name;
    index;
    isActive;
    isProductHolder;
    parentId;
    level;
    parent;
    children;
    products;
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        default: 0,
        comment: 'Sıralama üçün indeks (artan şəkildə göstəriləcək)',
    }),
    __metadata("design:type", Number)
], Category.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Category.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: false,
        comment: 'Bu kateqoriya məhsul saxlaya bilərmi',
    }),
    __metadata("design:type", Boolean)
], Category.prototype, "isProductHolder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'Parent kateqoriya ID-si',
    }),
    __metadata("design:type", Object)
], Category.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: 1,
        comment: 'Kateqoriyanın səviyyəsi (1-root)',
    }),
    __metadata("design:type", Number)
], Category.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category, (category) => category.children),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    __metadata("design:type", Object)
], Category.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Category, (category) => category.parent),
    __metadata("design:type", Array)
], Category.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.category),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)('categories')
], Category);
//# sourceMappingURL=category.entity.js.map