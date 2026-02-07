"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const page_entity_1 = require("../_common/entities/page.entity");
const page_service_1 = require("./page.service");
const page_controller_1 = require("./page.controller");
const i18n_module_1 = require("../i18n/i18n.module");
let PageModule = class PageModule {
};
exports.PageModule = PageModule;
exports.PageModule = PageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([page_entity_1.Page]),
            i18n_module_1.I18nModule,
        ],
        controllers: [page_controller_1.PageController],
        providers: [page_service_1.PageService],
    })
], PageModule);
//# sourceMappingURL=page.module.js.map