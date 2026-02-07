"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const section_service_1 = require("./section.service");
const section_controller_1 = require("./section.controller");
const section_entity_1 = require("../_common/entities/section.entity");
const page_entity_1 = require("../_common/entities/page.entity");
const i18n_module_1 = require("../i18n/i18n.module");
let SectionModule = class SectionModule {
};
exports.SectionModule = SectionModule;
exports.SectionModule = SectionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                section_entity_1.Section,
                page_entity_1.Page,
            ]),
            i18n_module_1.I18nModule,
        ],
        controllers: [section_controller_1.SectionController],
        providers: [section_service_1.SectionService],
        exports: [section_service_1.SectionService],
    })
], SectionModule);
//# sourceMappingURL=section.module.js.map