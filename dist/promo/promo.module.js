"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const promo_service_1 = require("./promo.service");
const promo_controller_1 = require("./promo.controller");
const promo_entity_1 = require("../_common/entities/promo.entity");
const product_entity_1 = require("../_common/entities/product.entity");
const upload_module_1 = require("../upload/upload.module");
const multer_1 = require("multer");
const file_validation_util_1 = require("../_common/utils/file-validation.util");
let PromoModule = class PromoModule {
};
exports.PromoModule = PromoModule;
exports.PromoModule = PromoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([promo_entity_1.Promo, product_entity_1.Product]),
            upload_module_1.UploadModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)(),
                fileFilter: file_validation_util_1.imageFileFilter,
                limits: {
                    fileSize: file_validation_util_1.imageMaxSize,
                },
            }),
        ],
        controllers: [promo_controller_1.PromoController],
        providers: [promo_service_1.PromoService],
        exports: [promo_service_1.PromoService],
    })
], PromoModule);
//# sourceMappingURL=promo.module.js.map