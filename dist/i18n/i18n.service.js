"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nService = void 0;
const common_1 = require("@nestjs/common");
const i18n_config_1 = require("../config/i18n.config");
let I18nService = class I18nService {
    getSupportedLanguages() {
        return i18n_config_1.i18nConfig.supportedLanguages;
    }
    getDefaultLanguage() {
        return i18n_config_1.i18nConfig.defaultLanguage;
    }
    translateField(field, lang) {
        if (!field)
            return '';
        if (typeof field === 'object' && field[lang])
            return field[lang];
        if (typeof field === 'string')
            return field;
        return field[i18n_config_1.i18nConfig.defaultLanguage] || '';
    }
};
exports.I18nService = I18nService;
exports.I18nService = I18nService = __decorate([
    (0, common_1.Injectable)()
], I18nService);
//# sourceMappingURL=i18n.service.js.map