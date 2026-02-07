"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const typeorm_config_1 = require("./config/typeorm.config");
const i18n_module_1 = require("./i18n/i18n.module");
const upload_module_1 = require("./upload/upload.module");
const auth_module_1 = require("./auth/auth.module");
const category_module_1 = require("./category/category.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const page_module_1 = require("./page/page.module");
const section_module_1 = require("./section/section.module");
const brand_module_1 = require("./brand/brand.module");
const faq_module_1 = require("./faq/faq.module");
const product_module_1 = require("./product/product.module");
const promo_module_1 = require("./promo/promo.module");
const testimonial_module_1 = require("./testimonial/testimonial.module");
const cart_module_1 = require("./cart/cart.module");
const contact_module_1 = require("./contact/contact.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmConfig),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            i18n_module_1.I18nModule,
            upload_module_1.UploadModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            upload_module_1.UploadModule,
            page_module_1.PageModule,
            section_module_1.SectionModule,
            brand_module_1.BrandModule,
            faq_module_1.FaqModule,
            product_module_1.ProductModule,
            promo_module_1.PromoModule,
            testimonial_module_1.TestimonialModule,
            cart_module_1.CartModule,
            contact_module_1.ContactModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map