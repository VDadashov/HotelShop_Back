"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBrandDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_brand_dto_1 = require("./create-brand.dto");
class UpdateBrandDto extends (0, swagger_1.PartialType)(create_brand_dto_1.CreateBrandDto) {
}
exports.UpdateBrandDto = UpdateBrandDto;
//# sourceMappingURL=update-brand.dto.js.map