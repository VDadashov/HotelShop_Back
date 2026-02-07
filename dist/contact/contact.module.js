"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModule = void 0;
const common_1 = require("@nestjs/common");
const contact_controller_1 = require("./contact.controller");
const contact_service_1 = require("./contact.service");
const typeorm_1 = require("@nestjs/typeorm");
const contact_entity_1 = require("../_common/entities/contact.entity");
const config_1 = require("@nestjs/config");
const email_service_1 = require("../_common/services/email.service");
let ContactModule = class ContactModule {
};
exports.ContactModule = ContactModule;
exports.ContactModule = ContactModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contact_entity_1.Contact]), config_1.ConfigModule],
        controllers: [contact_controller_1.ContactController],
        providers: [contact_service_1.ContactService, email_service_1.EmailService],
        exports: [email_service_1.EmailService],
    })
], ContactModule);
//# sourceMappingURL=contact.module.js.map